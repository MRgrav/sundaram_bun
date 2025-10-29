// src/components/LocationBenefitItem.tsx
import type { FC } from 'hono/jsx';

interface LocationBenefitItemProps {
    index: number;
    icons: string[]; 
    item?: { iconPath?: string; distance?: string; label?: string; }; // Item data
}

export const LocationBenefitItem: FC<LocationBenefitItemProps> = ({ index, icons, item = {} }) => (
    // ID is crucial for the HTMX target and JavaScript re-indexing
    <div class="benefit-item p-4 border border-blue-100 rounded-lg bg-blue-50 relative" data-index={index} id={`benefit-item-${index}`}>
        
        {/* Remove Button (uses JS/HTMX for removal and re-indexing) */}
        <button 
            type="button" 
            class="remove-benefit-btn absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold w-6 h-6 rounded-full hover:bg-red-100 transition-colors flex items-center justify-center"
            title="Remove Item"
            // We use a simple JS click handler to call a global re-indexing function
            onclick="document.getElementById(`benefit-item-${index}`).remove(); updateLocationBenefitIndexes();"
        >
            &times;
        </button>

        <h4 class="font-medium text-sm text-blue-800 mb-3 item-header">Item #{index + 1}</h4>
        
        {/* Icon Path (Select) */}
        <div class="grid grid-cols-3 gap-4 mb-3 items-center">
            <label class="text-sm text-zinc-600">Icon</label>
            <select 
                value={item.iconPath || ""} 
                name={`locationBenefits[${index}][iconPath]`}
                class="border border-zinc-300 px-3 py-1.5 col-span-2 rounded-md text-sm bg-white" 
            >
                <option value="">-- Select Icon --</option>
                {icons.map(icon => <option value={icon} selected={item.iconPath === icon}>{icon}</option>)}
            </select>
        </div>

        {/* Distance */}
        <div class="grid grid-cols-3 gap-4 mb-3 items-center">
            <label class="text-sm text-zinc-600">Distance</label>
            <input 
                type="text" 
                value={item.distance || ""} 
                placeholder="e.g., 5 km" 
                name={`locationBenefits[${index}][distance]`}
                class="border border-zinc-300 px-3 py-1.5 col-span-2 rounded-md text-sm" 
            />
        </div>

        {/* Label */}
        <div class="grid grid-cols-3 gap-4 items-center">
            <label class="text-sm text-zinc-600">Label</label>
            <input 
                type="text" 
                value={item.label || ""} 
                placeholder="e.g., Hospital" 
                name={`locationBenefits[${index}][label]`}
                class="border border-zinc-300 px-3 py-1.5 col-span-2 rounded-md text-sm" 
            />
        </div>
    </div>
);