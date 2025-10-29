import type { FC } from 'hono/jsx';

// --- Local Interfaces (Assuming structure from CMS data model) ---
interface MetaData {
    title?: string;
    meta_title?: string;
    meta_description?: string;
}

interface MetaSectionProps {
    pageId: string;
    data: MetaData;
}

// --- Shared Status Message Component ---
const StatusMessage: FC<{ pageId: string, sectionKey: string }> = ({ pageId, sectionKey }) => {
    // ID structure matches the one expected by the client-side HTMX listener
    const uniqueId = `status-msg-${sectionKey}-${pageId}`;
    return (
        <p id={uniqueId} class="text-sm text-gray-500 transition-colors duration-300">
            Ready to save.
        </p>
    );
};
// --- END Shared Status Message Component ---

export const MetaSection: FC<MetaSectionProps> = ({ pageId, data }) => {
    const SECTION_KEY = 'meta-section';
    const API_ENDPOINT = `/adi/cms/${SECTION_KEY}/${pageId}`;

    return (
        <form 
            hx-post={API_ENDPOINT}
            hx-trigger="submit"
            hx-swap="none" // We use client-side JS via HX-Trigger to update status
            class="p-6 bg-white rounded-lg shadow border border-gray-100 space-y-4"
        >
            <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">SEO & Metadata</h3>
            
            <div>
                <label for={`title-${pageId}`} class="block text-sm font-medium text-gray-700">Page Title</label>
                <input 
                    type="text" 
                    id={`title-${pageId}`} 
                    name="title" // Matches API field
                    value={data.title} 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            
            <div>
                <label for={`meta_title-${pageId}`} class="block text-sm font-medium text-gray-700">Meta Title</label>
                <input 
                    type="text" 
                    id={`meta_title-${pageId}`} 
                    name="meta_title" // Matches API field
                    value={data.meta_title} 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>

            <div>
                <label for={`meta_description-${pageId}`} class="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea 
                    id={`meta_description-${pageId}`} 
                    name="meta_description" // Matches API field
                    rows={3} 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none"
                >{data.meta_description}</textarea>
            </div>

            <div class="flex justify-between items-center pt-2">
                <StatusMessage pageId={pageId} sectionKey={SECTION_KEY} />
                <button type="submit" class="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-teal-700 transition duration-150">
                    Save Metadata
                </button>
            </div>
        </form>
    );
};
