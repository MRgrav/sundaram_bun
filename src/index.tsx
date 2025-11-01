import { About } from './routes/public/about';
import { Contact } from './routes/public/contact';
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { Home } from './routes/public/home';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { SkyLinkHeights } from './routes/projects/SkyLinkHeights';
import { PBArcade } from './routes/projects/PBArcade';
import { HoroGauriComplex } from './routes/projects/HoroGauriComplex';
import { ShivashreeApartment } from './routes/projects/ShivashreeApartment';
import { DivineGreen } from './routes/projects/DivineGreen';
import { Login } from './routes/admin/login';
import { Registration } from './routes/admin/registration';
import { Dashboard } from './routes/admin/dashboard';
import api from './routes/api';
import { authRequired } from './middleware/auth';
import { authRoutes } from './routes/auth';
import { ProjectGaellry } from './routes/admin/gallery';
// import authApp from './routes/admin/authApp';
// import { compress } from 'hono-compress';

const app = new Hono();

// app.use(compress());
app.use(logger())
app.use(secureHeaders())

// --- Static files
app.use("/output.css", serveStatic({ path: "./public/output.css" }));

// Serve all assets from /public folder
app.use("/*", serveStatic({ root: "./public" }));

// --- Routes
app.get("/", (c) => c.html(<Home />));
app.get("/sky-link-heights", (c) => c.html(<SkyLinkHeights />));
app.get("/divine-green", (c) => c.html(<DivineGreen />));
app.get("/shivashree", (c) => c.html(<ShivashreeApartment />));
app.get("/horo-gauri", (c) => c.html(<HoroGauriComplex />));
app.get("/pb-arcade", (c) => c.html(<PBArcade />));
app.get("/about", (c) => c.html(<About />));
app.get("/contact", (c) => c.html(<Contact />));

// --- AUTH ROUTES ---
app.get("/^^/login", (c) => c.html(<Login />)); // Mounts /login, /register, /logout
app.get("/^^/registration", (c) => c.html(<Registration />));
app.get("/adi/dashboard", authRequired, (c) => c.html(<Dashboard />));
app.get("/adi/gallery", authRequired, (c) => c.html(<ProjectGaellry />));
// app.get("/admin/home", (c) => c.html(<AdiHome />));
// app.get('/admin', (c) => {
//   return c.html(<AdiProject project={c.req.query('project') || 'home'} />)
// });

/**
 * GET /admin/page/:pageId
 * 1. Simulates PocketBase fetch of the Page Record.
 * 2. Parses any necessary JSON fields (already done in mock data here).
 * 3. Renders the main page view using PageSettings.
 */

app.route('/adi', api);
app.route('/^', authRoutes);

// --- 404
app.notFound((c) => c.html(<h1 class="text-center text-4xl mt-20">404 Not Found</h1>));

// --- Start server
const port = parseInt(process.env.PORT || "3000");
Bun.serve({
  port,
  fetch: app.fetch,
});

console.log(`🚀 Running at http://localhost:${port}`);
