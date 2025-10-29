import type { FC } from 'hono/jsx';

// --- Local Interfaces ---
interface MapData {
    map_url: string;
    map_description: string;
}

interface MapSectionProps {
    pageId: string;
    data?: MapData;
}

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

export const MapSection: FC<MapSectionProps> = ({ pageId, data }) => {
    const SECTION_KEY = 'map-section';
    const API_ENDPOINT = `/adi/cms/${SECTION_KEY}/${pageId}`;

    return (
        <form 
            hx-post={API_ENDPOINT}
            hx-trigger="submit"
            hx-swap="none"
            class="p-6 bg-white rounded-lg shadow border border-gray-100 space-y-4"
        >
            <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Location Map & Description</h3>
            
            <div>
                <label for={`map_url-${pageId}`} class="block text-sm font-medium text-gray-700">Map Embed URL (iframe source)</label>
                <input 
                    type="url" 
                    id={`map_url-${pageId}`} 
                    name="map_url" // Matches API field
                    value={data?.map_url} 
                    placeholder="e.g., https://www.google.com/maps/embed?..."
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            
            <div>
                <label for={`map_description-${pageId}`} class="block text-sm font-medium text-gray-700">Map Description</label>
                <textarea 
                    id={`map_description-${pageId}`} 
                    name="map_description" // Matches API field
                    rows={3} 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none"
                >{data?.map_description}</textarea>
            </div>

            <div class="flex justify-between items-center pt-2">
                <StatusMessage pageId={pageId} sectionKey={SECTION_KEY} />
                <button type="submit" class="px-6 py-2 border border-green-600 bg-green-300 text-green-800 font-semibold rounded hover:bg-green-400 transition duration-150 shadow-md">
                    Save Map Section
                </button>
            </div>
        </form>
    );
};
