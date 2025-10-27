// import { Hono } from 'hono';
// import { AdminLayout } from '../components/AdminLayout';
// import { pb } from '../lib/pocketbase';

// export const adminRoutes = new Hono();

// adminRoutes.get('/dashboard', (c) => {
//   return c.html(AdminLayout({
//     title: 'Dashboard',
//     children: `
//       <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div class="bg-white rounded-lg shadow p-6">
//           <h3 class="text-gray-500 text-sm font-medium">Total Users</h3>
//           <p class="text-3xl font-bold text-gray-900 mt-2">1,234</p>
//         </div>
//         <div class="bg-white rounded-lg shadow p-6">
//           <h3 class="text-gray-500 text-sm font-medium">Active Sessions</h3>
//           <p class="text-3xl font-bold text-gray-900 mt-2">456</p>
//         </div>
//         <div class="bg-white rounded-lg shadow p-6">
//           <h3 class="text-gray-500 text-sm font-medium">Revenue</h3>
//           <p class="text-3xl font-bold text-gray-900 mt-2">$12,345</p>
//         </div>
//       </div>
      
//       <div class="bg-white rounded-lg shadow p-6">
//         <h2 class="text-xl font-bold mb-4">Recent Activity</h2>
//         <p class="text-gray-600">No recent activity</p>
//       </div>
//     `
//   }));
// });

// adminRoutes.get('/users', async (c) => {
//   try {
//     // Example: Fetch users from PocketBase
//     // const users = await pb.collection('users').getList(1, 50);
    
//     return c.html(AdminLayout({
//       title: 'Users',
//       children: `
//         <div class="bg-white rounded-lg shadow">
//           <div class="p-6 border-b">
//             <h2 class="text-xl font-bold">Users Management</h2>
//           </div>
//           <div class="p-6">
//             <table class="min-w-full">
//               <thead>
//                 <tr class="border-b">
//                   <th class="text-left py-3 px-4">Name</th>
//                   <th class="text-left py-3 px-4">Email</th>
//                   <th class="text-left py-3 px-4">Role</th>
//                   <th class="text-left py-3 px-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr class="border-b hover:bg-gray-50">
//                   <td class="py-3 px-4">John Doe</td>
//                   <td class="py-3 px-4">john@example.com</td>
//                   <td class="py-3 px-4">
//                     <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Admin</span>
//                   </td>
//                   <td class="py-3 px-4">
//                     <button class="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
//                     <button class="text-red-500 hover:text-red-700">Delete</button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       `
//     }));
//   } catch (error) {
//     return c.html(AdminLayout({
//       title: 'Users - Error',
//       children: `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error loading users</div>`
//     }));
//   }
// });

// adminRoutes.get('/settings', (c) => {
//   return c.html(AdminLayout({
//     title: 'Settings',
//     children: `
//       <div class="bg-white rounded-lg shadow p-6">
//         <h2 class="text-xl font-bold mb-4">Settings</h2>
//         <form>
//           <div class="mb-4">
//             <label class="block text-gray-700 text-sm font-bold mb-2">
//               Site Name
//             </label>
//             <input 
//               type="text" 
//               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               value="My Admin App"
//             >
//           </div>
//           <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Save Changes
//           </button>
//         </form>
//       </div>
//     `
//   }));
// });
