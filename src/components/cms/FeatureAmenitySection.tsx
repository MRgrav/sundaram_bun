import type { FC } from 'hono/jsx';

// --- Local Interfaces ---
interface FeatureAmenity { iconPath: string; label: string; }

interface AmenitiesData {
    title: string;
    features: FeatureAmenity[];
}

interface FeatureAmenitySectionProps {
    pageId: string;
    data?: AmenitiesData;
}

// Fixed list of icons for selection (mock data)
const DEFAULT_ICONS = ["icon_pool.svg", "icon_gym.svg", "icon_park.svg", "icon_security.svg", "icon_parking.svg"];
const NUM_SLOTS = 5;

// --- Shared Status Message Component ---
const StatusMessage: FC<{ pageId: string, sectionKey: string }> = ({ pageId, sectionKey }) => {
    const uniqueId = `status-msg-${sectionKey}-${pageId}`;
    return (
        <p id={uniqueId} class="text-sm text-gray-500 transition-colors duration-300">
            Ready to save.
        </p>
    );
};
// --- END Shared Status Message Component ---


// --- Sub-Component for a Single Benefit Item ---
const FixedBenefitItemInput: FC<{ index: number, item: FeatureAmenity, icons: string[] }> = ({ index, item, icons }) => (
    <div class="p-4 border border-blue-100 rounded-lg bg-blue-50 space-y-2">
        <h4 class="font-medium text-sm text-blue-800">Slot #{index + 1}</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
                <label class="text-xs text-zinc-600 block mb-1">Icon Path</label>
                <select 
                    name={`features[${index}][iconPath]`} // Key for Hono's parsing utility
                    class="w-full border border-zinc-300 px-2 py-1.5 rounded-md text-sm bg-white" 
                >
                    <option value="">-- Select Icon (Optional) --</option>
                    {icons.map(icon => (
                        <option value={icon} selected={item.iconPath === icon}>{icon}</option>
                    ))}
                </select>
            </div>
            <div>
                <label class="text-xs text-zinc-600 block mb-1">Label Text</label>
                <input 
                    type="text" 
                    value={item.label || ""} 
                    placeholder="e.g., Clubhouse Access" 
                    name={`features[${index}][label]`} // Key for Hono's parsing utility
                    class="w-full border border-zinc-300 px-2 py-1.5 rounded-md text-sm" 
                />
            </div>
        </div>
    </div>
);


export const FeatureAmenitySection: FC<FeatureAmenitySectionProps> = ({ pageId, data }) => {
    const SECTION_KEY = 'amenities-section';
    const API_ENDPOINT = `/adi/cms/${SECTION_KEY}/${pageId}`;
    
    // Ensure we render exactly NUM_SLOTS, filling empty spots with defaults
    const slots = Array.from({ length: NUM_SLOTS }, (_, index) => data?.features[index] || { iconPath: "", label: "" });

    return (
        <form 
            hx-post={API_ENDPOINT}
            hx-trigger="submit"
            hx-swap="none"
            class="p-6 bg-white rounded-lg shadow border border-gray-100 space-y-6"
        >
            <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">Feature & Amenities (JSON Field)</h3>
            
            {/* Section Title */}
            <div>
                <label for={`amenity-title-${pageId}`} class="block text-sm font-medium text-gray-700">Section Title</label>
                <input 
                    type="text" 
                    id={`amenity-title-${pageId}`} 
                    name="title" // Field required by parseFeatureAmenities
                    value={data?.title} 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>

            {/* Fixed Slots */}
            <div class="space-y-4">
                {slots.map((item, index) => (
                    <FixedBenefitItemInput key={index} index={index} item={item} icons={DEFAULT_ICONS} />
                ))}
            </div>

            <div class="flex justify-between items-center pt-2 border-t">
                <StatusMessage pageId={pageId} sectionKey={SECTION_KEY} />
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150">
                    Save Amenities
                </button>
            </div>
        </form>
    );
};
