import { FC } from 'hono/jsx';

// --- ASSUMED INTERFACES (from interfaces/cms.ts) ---
// Defined locally for type context
interface ImageDetails {
    id: string;
    alt: string;
    url: string;
}
interface ImageSelectorProps {
    /** The unique ID of the modal */
    modalId: string;
    /** The hidden input field ID that should receive the selected image ID */
    targetInputId: string;
    /** Whether multiple selections are allowed (for Gallery vs. Hero) */
    multiSelect: boolean;
    /** The currently selected image IDs (comma-separated string) */
    currentSelection: string; 
}

// --- JS for Modal Control (Client-Side Logic) ---
/*
 * In a real Hono/HTMX app, this script would be in a separate .js file or inline 
 * in Layout.tsx. We place it here for demonstration simplicity.
 */
const ModalScript = () => (
    <script dangerouslySetInnerHTML={{
        __html: `
            // Listen for clicks on dynamically loaded image items within the modal
            document.addEventListener('click', function(e) {
                const target = e.target.closest('[data-image-id]');
                if (!target) return;

                const imageId = target.dataset.imageId;
                const modalEl = target.closest('[data-modal-id]');
                if (!modalEl) return;
                
                const inputId = modalEl.dataset.targetInputId;
                const inputEl = document.getElementById(inputId);
                
                if (inputEl) {
                    // For single select (Hero image)
                    if (!modalEl.dataset.multiSelect || modalEl.dataset.multiSelect === 'false') {
                        inputEl.value = imageId;
                        // Close modal after selection
                        document.getElementById(modalEl.id).classList.add('hidden');
                    } 
                    // For multi select (Gallery) - requires more complex logic
                    // This is left simple, as gallery updates are typically done via a separate API route
                    else {
                        // Simple toggle logic for demo
                        let currentIds = inputEl.value.split(',').filter(id => id.trim() !== '');
                        const index = currentIds.indexOf(imageId);

                        if (index > -1) {
                            currentIds.splice(index, 1); // Remove
                            target.classList.remove('border-indigo-500', 'ring-2');
                        } else {
                            currentIds.push(imageId); // Add
                            target.classList.add('border-indigo-500', 'ring-2');
                        }
                        inputEl.value = currentIds.join(',');
                    }
                }
            });

            // Logic to open/close the modal
            document.addEventListener('click', function(e) {
                const openBtn = e.target.closest('[data-modal-open]');
                const closeBtn = e.target.closest('[data-modal-close]');
                const modalId = openBtn?.dataset.modalOpen || closeBtn?.dataset.modalClose;

                if (!modalId) return;

                const modal = document.getElementById(modalId);
                if (!modal) return;

                if (openBtn) {
                    modal.classList.remove('hidden');
                    // Trigger HTMX load for media list only when opening
                    if (modal.querySelector('[hx-trigger="load, visible"]')) {
                        htmx.trigger(modal.querySelector('[hx-get]'), 'load');
                    }
                } else if (closeBtn) {
                    modal.classList.add('hidden');
                }
            });
        `,
    }} />
);

/**
 * Image Selector Modal Component: Loads image content dynamically via HTMX.
 * @param modalId - The ID of the modal element.
 * @param targetInputId - The ID of the hidden input field to update with the selected image ID(s).
 * @param multiSelect - If true, allows multiple selections.
 */
export const ImageSelectorModal: FC<ImageSelectorProps> = ({ 
    modalId, 
    targetInputId, 
    multiSelect, 
    currentSelection 
}) => {
    // Inject the necessary client-side JS
    const Script = ModalScript();
    
    // Set initial selection array for styling in the HTMX content
    const selectedIds = currentSelection.split(',').map(id => id.trim()).filter(id => id !== '');

    return (
        <>
            {Script}
            <div 
                id={modalId} 
                className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 hidden transition-opacity overflow-y-auto"
                data-modal-id={modalId}
                data-target-input-id={targetInputId}
                data-multi-select={multiSelect.toString()}
            >
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl transform transition-all">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800">
                                Select {multiSelect ? 'Images' : 'Image'}
                            </h3>
                            <button 
                                type="button" 
                                className="text-gray-400 hover:text-gray-600 transition"
                                data-modal-close={modalId}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        
                        <div className="p-6 h-96 overflow-y-auto">
                            {/* HTMX Placeholder: Content loaded here on modal open */}
                            <div 
                                id={`modal-content-${modalId}`}
                                // HTMX attributes to fetch the image list
                                hx-get="/api/cms/media/list" 
                                hx-trigger="load" // HTMX will trigger 'load' when JS opens the modal
                                hx-swap="innerHTML"
                            >
                                <div className="flex justify-center items-center h-full">
                                    <div className="text-center text-gray-500">
                                        {/* Loading Indicator */}
                                        <svg className="animate-spin h-5 w-5 text-indigo-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading media...
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t flex justify-end">
                            <button 
                                type="button" 
                                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-medium"
                                data-modal-close={modalId}
                            >
                                {multiSelect ? 'Done' : 'Close'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
