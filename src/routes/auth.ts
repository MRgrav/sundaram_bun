import { Hono } from "hono";
import { serialize } from "hono/utils/cookie";
import { pb } from "../lib/pocketbase";
import { authRequired } from "../middleware/auth";

export const authRoutes = new Hono();

const AUTH_COOKIE = "pb_auth";
const ONE_WEEK = 7 * 24 * 60 * 60; // seconds

// Helper to set cookie
function setAuthCookie(c: any, token: any) {
  const cookie = serialize(AUTH_COOKIE, token, {
    httpOnly: true,
    path: "/",
    maxAge: ONE_WEEK,
    sameSite: "lax",
    secure: true,
  });
  c.header("Set-Cookie", cookie);
}

// Registration route: expects form data (x-www-form-urlencoded)
authRoutes.post("/start", async (c) => {
  try {
    const form = await c.req.parseBody(); // Hono provides parseBody() for form data
    const name = form.name as string;
    const email = form.email as string;
    const password = form.password as string;
    const passwordConfirm = form.passwordConfirm;

    // Basic server-side validation
    if (!name || !email || !password || password !== passwordConfirm) {
      return c.html(
        `<form hx-post="/auth/start" hx-swap="outerHTML" hx-target="closest form" class="max-w-md bg-zinc-200 p-6 rounded shadow">
           <div class="mb-4 text-red-600">Validation failed: ensure all fields are filled and passwords match.</div>
         </form>`,
        400
      );
    }

    // Create user
    const created = await pb.collection("users").create({
      email,
      password,
      passwordConfirm,
      name,
    });

    // Authenticate user and get token
    const authData = await pb.collection("users").authWithPassword(email, password);
    // Save token server-side (we'll send cookie to client)
    setAuthCookie(c, authData.token);

    // Return an HTMX fragment that replaces the form with a success message and a redirect script
    // Use a small client-side script to redirect after success (htmx won't follow 3xx redirects automatically in many setups)
    return c.html(
      `<div class="max-w-md bg-zinc-200 p-6 rounded shadow">
         <div class="mb-4 text-green-700">Registration successful. Redirecting…</div>
         <script>setTimeout(()=>location.href='/adi/dashboard',400)</script>
       </div>`
    );
  } catch (err: any) {
    const msg = (err?.data?.message || err?.message || "Registration failed").toString();
    return c.html(
      `<form hx-post="/auth/start" hx-swap="outerHTML" hx-target="closest form" class="max-w-md bg-zinc-200 p-6 rounded shadow">
         <div class="mb-4 text-red-600">${msg}</div>
       </form>`,
      400
    );
  }
});

// Login route used by hx-post from a login form (similar approach)
authRoutes.post("/login", async (c) => {
  try {
    const form = await c.req.parseBody();
    const email = form.email as string;
    const password = form.password as string;

    if (!email || !password) {
      return c.html(`<div class="text-red-600">Email and password required.</div>`, 400);
    }

    const authData = await pb.collection("users").authWithPassword(email, password);
    setAuthCookie(c, authData.token);

    return c.html(
      `<div class="max-w-md bg-zinc-200 p-6 rounded shadow">
         <div class="mb-4 text-green-700">Login successful. Redirecting…</div>
         <script>setTimeout(()=>location.href='/adi/dashboard',200)</script>
       </div>`
    );
  } catch (err: any) {
    const msg = (err?.data?.message || err?.message || "Login failed").toString();
    return c.html(`<div class="text-red-600">${msg}</div>`, 400);
  }
});

authRoutes.post('/logout', async (c) => {
    pb.authStore.clear();
    c.header('Set-Cookie', serialize('pb_auth', '', { path: '/', maxAge: 0 }));
    return c.redirect('/^^/login');
});
