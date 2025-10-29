// // src/components/FeatureAmenitySection.tsx
// import type { FC } from 'hono/jsx';
// import { html } from 'hono/html';

// // Define the data structure
// interface BenefitItem {
//   icon_path: string;
//   label: string;
// }

// interface FeatureAmenitySectionData {
//   title: string;
//   benefits: BenefitItem[];
// }

// interface FeatureAmenitySectionProps {
//   sectionData?: FeatureAmenitySectionData;
//   availableIcons?: string[];
//   // 🔑 Pass the unique ID of the page/record being edited
//   pageId: string; 
// }

// // Default list of icons for the select box
// const DEFAULT_ICONS = [
//     "pool.svg", 
//     "gym.svg", 
//     "security.svg", 
//     "parking.svg", 
//     "wifi.svg",
//     "park.svg"
// ];

// // --- Sub-Component for a Single Benefit Item ---
// export const FixedBenefitItemInput: FC<{ index: number, item: BenefitItem, icons: string[] }> = ({ index, item, icons }) => (
//     <div class="p-4 border border-blue-100 rounded-lg bg-blue-50 relative">
//         <h4 class="font-medium text-sm text-blue-800 mb-3">Slot #{index + 1}</h4>
        
//         <div class="grid grid-cols-3 gap-4 mb-3 items-center">
//             <label class="text-sm text-zinc-600">Icon Path</label>
//             <select 
//                 value={item.icon_path || ""} 
//                 name={`benefits[${index}][icon_path]`}
//                 class="border border-zinc-300 px-3 py-1.5 col-span-2 rounded-md text-sm bg-white" 
//             >
//                 <option value="">-- Select Icon (Optional) --</option>
//                 {icons.map(icon => (
//                     <option value={icon} selected={item.icon_path === icon}>{icon}</option>
//                 ))}
//             </select>
//         </div>

//         <div class="grid grid-cols-3 gap-4 items-center">
//             <label class="text-sm text-zinc-600">Label Text</label>
//             <input 
//                 type="text" 
//                 value={item.label || ""} 
//                 placeholder="e.g., 24/7 Security" 
//                 name={`benefits[${index}][label]`}
//                 class="border border-zinc-300 px-3 py-1.5 col-span-2 rounded-md text-sm" 
//             />
//         </div>
//     </div>
// );


// // --- Main Section Component ---
// export const FeatureAmenitySection: FC<FeatureAmenitySectionProps> = ({ 
//     sectionData = { title: "", benefits: [] }, 
//     availableIcons = DEFAULT_ICONS,
//     pageId // Required to know which page record to update
// }) => {

//     const { title, benefits } = sectionData;
//     const NUM_SLOTS = 6;
    
//     // Create an array representing 6 slots, filling with existing data where available
//     const slots = Array.from({ length: NUM_SLOTS }, (_, index) => {
//         return benefits[index] || { icon_path: "", label: "" };
//     });

//     return (
//         // 🔑 HTMX FORM WRAPPER
//         // We use a unique ID for the target to avoid conflicts with other forms
//         <form 
//             id={`amenity-form-${pageId}`}
//             class="p-6 rounded-lg border border-zinc-200 bg-white shadow-lg"
//             // HTMX POST request to your Hono backend route
//             hx-post={`/api/cms/update-amenities/${pageId}`}
//             // Target the status message container for the response
//             hx-target={`#amenity-status-${pageId}`}
//             // Swap the response HTML into the target element's outer HTML (replace)
//             hx-swap="outerHTML"
//         >
//             <h2 class="font-semibold text-2xl text-zinc-700 mb-6 border-b pb-3">Feature & Amenities Section (Fixed Slots)</h2>
            
//             {/* 1. Section Title Input */}
//             <div class="mb-8">
//                 <label class="block font-medium text-sm text-zinc-700 mb-2" for="amenities-title">Section Title</label>
//                 <input 
//                     type="text" 
//                     id="amenities-title"
//                     name="title" // Changed name to 'title' for simplicity in backend parsing
//                     value={title}
//                     placeholder="e.g., Prime Project Amenities"
//                     class="w-full border border-zinc-300 px-4 py-2 rounded-lg text-base focus:ring-sky-500 focus:border-sky-500" 
//                 />
//             </div>

//             {/* 2. Fixed Benefit Slots */}
//             <h3 class="font-medium text-lg text-zinc-600 mb-4">Benefit Slots (1 to {NUM_SLOTS})</h3>

//             <div id="amenities-list" class="space-y-4">
//                 {/* Render exactly 6 fixed slots */}
//                 {slots.map((item, index) => (
//                     <FixedBenefitItemInput key={index} index={index} item={item} icons={availableIcons} />
//                 ))}
//             </div>

//             <p class="my-4 text-sm text-zinc-500">Note: This section has a fixed limit of {NUM_SLOTS} benefits. Leave slots empty to hide them on the front end.</p>
            
//             <div class="flex justify-between items-center pt-4">
//                 {/* Status Message Container (HTMX Target) */}
//                 <p id={`amenity-status-${pageId}`} class="text-sm font-medium text-slate-600">
//                     Ready to save.
//                 </p>

//                 {/* Submit Button */}
//                 <button 
//                     class="px-3 py-1 text-green-700 border border-green-600 bg-green-200 rounded-xl hover:bg-green-300 transition-colors" 
//                     type='submit'
//                 >
//                     Update
//                 </button>
//             </div>
//         </form>
//     );
// };