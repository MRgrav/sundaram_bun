import type { FC } from 'hono/jsx';

// --- Local Interfaces ---
// Simplified representation of expanded gallery data
interface GalleryItem { id: string; path: string; alt: string; }

interface ImageGallerySectionProps {
    pageId: string;
    data?: GalleryItem[];
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

export const ImageGallerySection: FC<ImageGallerySectionProps> = ({ pageId, data }) => {
    const SECTION_KEY = 'gallery-section';
    const API_ENDPOINT = `/adi/cms/${SECTION_KEY}/${pageId}`;

    return (
        <form 
            hx-post={API_ENDPOINT}
            hx-trigger="submit"
            hx-swap="none"
            class="p-6 bg-white rounded-lg shadow border border-gray-100 space-y-4"
        >
            <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Image Gallery (Multiple Relations)</h3>

            <p class="text-sm text-gray-500">
                Current images selected: <span class="font-medium text-gray-700">{data?.length}</span>
            </p>

            {/* Container for selected images and their hidden inputs */}
            <div id={`selected-gallery-${pageId}`} class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 p-4 border rounded-md min-h-[100px] bg-gray-50">
                {data && data.length > 0 ? (
                    data.map(item => (
                        <div key={item.id} class="relative group aspect-square rounded-lg overflow-hidden border-2 border-green-400">
                            {/* Hidden input field required for submission (name must be gallery[]) */}
                            <input type="hidden" name="gallery[]" value={item.id} />
                            
                            {/* Simplified Visual: Replace with proper image display */}
                            <div class="flex items-center justify-center w-full h-full bg-gray-200 text-xs text-gray-700 p-1">
                                ID: {item.id.substring(0, 5)}...
                            </div>
                            
                            {/* Remove button overlay (requires client-side JS to remove the parent div and input) */}
                            <button 
                                type="button" 
                                class="absolute top-1 right-1 bg-red-600 text-white rounded-full h-6 w-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                // This would need client-side JS to remove the image's wrapper and input
                            >
                                X
                            </button>
                        </div>
                    ))
                ) : (
                    <div class="col-span-full flex items-center justify-center text-gray-400">
                        No images selected yet.
                    </div>
                )}
            </div>

            {/* Add Image Button (Placeholder for triggering the ImageSelectorModal) */}
            <div class="flex justify-end">
                <button type="button" class="px-3 py-1 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition duration-150">
                    + Add/Manage Images
                </button>
            </div>


            <div class="flex justify-between items-center pt-2 border-t">
                <StatusMessage pageId={pageId} sectionKey={SECTION_KEY} />
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150">
                    Save Gallery
                </button>
            </div>
        </form>
    );
};
