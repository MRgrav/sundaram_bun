import { createMiddleware } from 'hono/factory';
import { getCookie } from 'hono/cookie';
import { pb, AuthUser } from '../lib/pocketbase'; // Import pb and AuthUser type

// Define the variable structure we'll use in the Hono context
declare module 'hono' {
    interface ContextVariableMap {
        user: AuthUser | null;
    }
}

/**
 * Middleware to check authentication state from PocketBase cookie.
 * Reads the 'pb_auth' cookie and validates the session.
*/

export const authMiddleware = createMiddleware(async (c, next) => {
    const authCookie = getCookie(c, 'pb_auth');
    pb.authStore.loadFromCookie(`pb_auth=${authCookie || ''}`);

    let user: AuthUser | null = null;
    
    if (pb.authStore.isValid) {
        try {
            // ✅ FIX 1: Explicitly pass your custom type (AuthUser) as the generic argument 
            // to the authRefresh method. This tells TypeScript what kind of record to expect.
            const authData = await pb.collection('users').authRefresh<AuthUser>();
            
            // ✅ FIX 2: Safely assign the model from authStore or the returned authData.
            // Since we specified the generic type in authRefresh, TypeScript now trusts the type.
            user = authData.record;
            
        } catch (_) {
            // Token expired or invalid, clear the store
            pb.authStore.clear();
        }
    }

    // Attach the user object to the Hono context variables
    c.set('user', user);

    await next();
});

/**
 * Route protector middleware. Redirects unauthenticated users.
 */
export const protectRoute = createMiddleware(async (c, next) => {
    const user = c.get('user');

    if (!user) {
        // Redirect unauthenticated users to the login page
        return c.redirect('/login');
    }

    await next();
});