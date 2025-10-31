import { getCookie } from 'hono/cookie';
import { Context, Next } from "hono";
import { pb } from "../lib/pocketbase";

const AUTH_COOKIE = "pb_auth";

export async function authRequired(c: Context, next: Next) {
  const token = getCookie(c, AUTH_COOKIE);
  console.log(token);
  if (!token) return c.redirect("/^^/login", 302);

  try {
    pb.authStore.save(token, null);
    await pb.collection("users").authRefresh(); // validates token and populates model
    c.set("pb_user", pb.authStore.model);
    await next();
  } catch (err) {
    pb.authStore.clear();
    return c.redirect("/login", 302);
  }
}
