import type { FC } from 'hono/jsx';

// --- Local Interfaces ---
interface HeroData {
    hero_heading: string;
    hero_subheading: string;
    hero_address: string;
    hero_highlight_one: string;
    hero_highlight_two: string;
    hero_image: string | null; // PocketBase relation ID
}

interface HeroSectionProps {
    pageId: string;
    data?: HeroData;
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

export const HeroSection: FC<HeroSectionProps> = ({ pageId, data }) => {
    const SECTION_KEY = 'hero-section';
    const API_ENDPOINT = `/adi/cms/${SECTION_KEY}/${pageId}`;
    
    // Simplistic visual representation of a selected image
    const imagePreview = data?.hero_image 
        ? <span class="text-xs text-green-600">Image ID: {data?.hero_image.substring(0, 8)}...</span>
        : <span class="text-xs text-red-600">No Image Selected</span>;

    return (
        <form 
            hx-post={API_ENDPOINT}
            hx-trigger="submit"
            hx-swap="none"
            class="p-6 bg-white rounded-lg shadow border border-gray-100 space-y-4"
        >
            <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Hero Section Content</h3>
            
            {/* Standard Text Fields */}
            {data && ['hero_heading', 'hero_subheading', 'hero_address'].map(field => (
                <div>
                    <label for={`${field}-${pageId}`} class="block text-sm font-medium text-gray-700 capitalize">{field.replace(/_/g, ' ')}</label>
                    <input 
                        type="text" 
                        id={`${field}-${pageId}`} 
                        name={field}
                        value={data[field as keyof HeroData] || ''} 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
            ))}
            
            {/* Highlight Fields */}
            <div class="grid grid-cols-2 gap-4">
                {data && ['hero_highlight_one', 'hero_highlight_two'].map(field => (
                    <div>
                        <label for={`${field}-${pageId}`} class="block text-sm font-medium text-gray-700 capitalize">{field.replace(/_/g, ' ')}</label>
                        <input 
                            type="text" 
                            id={`${field}-${pageId}`} 
                            name={field}
                            value={data[field as keyof HeroData] || ''} 
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                ))}
            </div>

            {/* Hero Image Relation */}
            {/* <div class="pt-2 border-t mt-4">
                <label class="block text-sm font-medium text-gray-700">Hero Image (Relation)</label>
                <div class="flex items-center space-x-4 mt-1">
                    {imagePreview} */}
                    {/* Hidden input to hold the actual PocketBase relation ID */}
                    {/* <input type="hidden" name="hero_image_id" value={data?.hero_image || ''} /> */}
                    {/* Placeholder for the Image Selector Modal Button */}
                    {/* <button type="button" class="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600">
                        Select Image
                    </button>
                </div>
            </div> */}

            <div class="flex justify-between items-center pt-2">
                <StatusMessage pageId={pageId} sectionKey={SECTION_KEY} />
                <button type="submit" class="px-6 py-2 border border-green-600 bg-green-300 text-green-800 font-semibold rounded hover:bg-green-400 transition duration-150 shadow-md">
                    Save Hero Section
                </button>
            </div>
        </form>
    );
};
