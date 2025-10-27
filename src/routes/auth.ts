// import { Hono } from 'hono';
// import { Layout } from '../components/Layout';

// export const authRoutes = new Hono();

// authRoutes.get('/login', (c) => {
//   return c.html(Layout({
//     title: 'Login',
//     children: `
//       <div class="min-h-screen flex items-center justify-center">
//         <div class="bg-white p-8 rounded-lg shadow-md w-96">
//           <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
//           <form action="/login" method="POST">
//             <div class="mb-4">
//               <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
//                 Email
//               </label>
//               <input 
//                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
//                 id="email" 
//                 type="email" 
//                 name="email"
//                 placeholder="Email"
//                 required
//               >
//             </div>
//             <div class="mb-6">
//               <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
//                 Password
//               </label>
//               <input 
//                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
//                 id="password" 
//                 type="password" 
//                 name="password"
//                 placeholder="Password"
//                 required
//               >
//             </div>
//             <button 
//               class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline" 
//               type="submit"
//             >
//               Sign In
//             </button>
//           </form>
//         </div>
//       </div>
//     `
//   }));
// });

// authRoutes.post('/login', async (c) => {
//   // Handle login logic here with PocketBase
//   return c.redirect('/admin/dashboard');
// });

// authRoutes.get('/logout', (c) => {
//   // Handle logout
//   return c.redirect('/login');
// });
