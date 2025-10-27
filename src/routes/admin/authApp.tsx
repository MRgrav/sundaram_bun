// import { Hono } from 'hono';
// import { setCookie } from 'hono/cookie';
// import { authMiddleware } from '../../middleware/auth';
// import { pb } from '../../lib/pocketbase';
// import { AuthLayout } from '../../components/AuthLayout';

// const authApp = new Hono();

// // Apply auth middleware to all auth routes to check for existing session
// authApp.use(authMiddleware);

// // --- Logout Route ---
// authApp.get('/logout', async (c) => {
//     // Clear PocketBase auth store
//     pb.authStore.clear();

//     // Clear the cookie in the browser
//     setCookie(c, 'pb_auth', '', {
//         expires: new Date(0), // Expire immediately
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         path: '/',
//     });
    
//     return c.redirect('/');
// });


// // --- Registration Route ---
// authApp.get('/register', (c) => {
//     if (c.get('user')) return c.redirect('/dashboard');

//     return c.html(
//         <AuthLayout title="Register" user={c.get('user')}>
//             <h1 class="text-3xl font-bold mb-6">Register</h1>
//             <form method='post' action="/register" class="max-w-md bg-white p-6 rounded shadow">
//                 <div class="mb-4">
//                     <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
//                     <input type="text" id="username" name="username" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
//                 </div>
//                 <div class="mb-4">
//                     <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
//                     <input type="email" id="email" name="email" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
//                 </div>
//                 <div class="mb-6">
//                     <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
//                     <input type="password" id="password" name="password" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
//                 </div>
//                 <div class="mb-6">
//                     <label class="block text-gray-700 text-sm font-bold mb-2" for="passwordConfirm">Confirm Password</label>
//                     <input type="password" id="passwordConfirm" name="passwordConfirm" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
//                 </div>
//                 <button type="submit" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
//             </form>
//         </AuthLayout>
//     );
// });

// authApp.post('/register', async (c) => {
//     const data = await c.req.parseBody();
//     const { username, email, password, passwordConfirm } = data as Record<string, string>;

//     try {
//         await pb.collection('users').create({
//             username,
//             email,
//             emailVisibility: true,
//             password,
//             passwordConfirm,
//             name: username // PocketBase default field
//         });
        
//         // After successful registration, log the user in immediately
//         await pb.collection('users').authWithPassword(email, password);
        
//         // PocketBase client automatically updates pb.authStore with the new token.
//         // We now save this auth store state to the browser cookie.
//         setCookie(c, 'pb_auth', pb.authStore.exportToCookie().split(';')[0].replace('pb_auth=', ''), {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             path: '/',
//         });

//         return c.redirect('/dashboard');

//     } catch (error) {
//         // Handle PocketBase error (e.g., email already exists, invalid fields)
//         const errorMessage = (error as any)?.data?.data?.email?.message || "Registration failed. Check password length or email.";
        
//         // For simplicity, redirect back to login and display a console error
//         console.error("Registration Error:", error);
//         return c.redirect(`/register?error=${encodeURIComponent(errorMessage)}`);
//     }
// });


// // --- Login Route ---
// authApp.get('/login', (c) => {
//     if (c.get('user')) return c.redirect('/dashboard');
    
//     const error = c.req.query('error') || '';

//     return c.html(
//         <AuthLayout title="Login" user={c.get('user')}>
//             <h1 class="text-3xl font-bold mb-6">Login</h1>
//             {error && (
//                 <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md" role="alert">
//                     <p>{decodeURIComponent(error)}</p>
//                 </div>
//             )}
//             <form method="post" action="/login" class="max-w-md bg-white p-6 rounded shadow">
//                 <div class="mb-4">
//                     <label class="block text-gray-700 text-sm font-bold mb-2" for="identity">Email or Username</label>
//                     <input type="text" id="identity" name="identity" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
//                 </div>
//                 <div class="mb-6">
//                     <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
//                     <input type="password" id="password" name="password" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
//                 </div>
//                 <button type="submit" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
//             </form>
//         </AuthLayout>
//     );
// });

// authApp.post('/login', async (c) => {
//     const data = await c.req.parseBody();
//     const { identity, password } = data as Record<string, string>;

//     try {
//         await pb.collection('users').authWithPassword(identity, password);

//         // Save PocketBase auth store state to the browser cookie
//         setCookie(c, 'pb_auth', pb.authStore.exportToCookie().split(';')[0].replace('pb_auth=', ''), {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             path: '/',
//         });

//         return c.redirect('/dashboard');

//     } catch (error) {
//         console.error("Login Error:", error);
//         const errorMessage = "Invalid credentials. Please try again.";
//         return c.redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
//     }
// });

// export default authApp;