// src/components/ImageSelectorModal.tsx
import type { FC } from 'hono/jsx';
import { html } from 'hono/html';

// The ID of the primary input field this selector is intended to fill.
// E.g., 'heroSection[image][path]'
interface ImageSelectorModalProps {
    targetInputName?: string; 
    modalId?: string; // Unique ID for the modal element
    pocketBaseUrl?: string; // e.g., 'http://127.0.0.1:8090'
}

export const ImageSelectorModal: FC<ImageSelectorModalProps> = ({ 
    targetInputName, 
    modalId,
    pocketBaseUrl = process.env.POCKETBASE_URL
}) => {
    
    // The collection name for your files/media records in PocketBase
    const MEDIA_COLLECTION = 'media'; 
    const IMAGE_LOAD_ROUTE = `/api/cms/load-images`;
    
    // Note: The hidden class 'hidden' is managed by the client-side script
    return (
        <div 
            id={modalId} 
            class="fixed inset-0 z-50 hidden items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300"
            role="dialog"
            aria-modal="true"
        >
            <div class="bg-white rounded-xl shadow-2xl w-11/12 max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                
                {/* Modal Header */}
                <div class="flex justify-between items-center p-4 border-b">
                    <h3 class="text-xl font-semibold text-gray-800">Select Media Asset</h3>
                    <button 
                        type="button" 
                        class="text-gray-400 hover:text-gray-600 close-modal-btn"
                        data-modal-id={modalId}
                    >
                        &times;
                    </button>
                </div>
                
                {/* Modal Body: This is the HTMX target */}
                <div 
                    id={`${modalId}-content`} 
                    class="p-4 overflow-y-auto grow"
                >
                    <p class="text-center text-gray-500 py-10">
                        Click "Load Images" to view the media library.
                    </p>
                    
                </div>
                
                {/* Modal Footer */}
                <div class="p-4 border-t flex justify-between items-center">
                    <button 
                        type="button" 
                        class="px-4 py-2 text-sm font-medium rounded-lg bg-sky-500 hover:bg-sky-600 text-white"
                        // 🔑 HTMX Call to load media grid
                        hx-get={IMAGE_LOAD_ROUTE}
                        hx-target={`#${modalId}-content`}
                        hx-swap="innerHTML"
                        // Pass the target input name so the server can render the correct JS
                        hx-vals={`js:{targetName: '${targetInputName}'}`}
                    >
                        Load Images
                    </button>
                    <button 
                        type="button" 
                        class="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-100 close-modal-btn"
                        data-modal-id={modalId}
                    >
                        Close
                    </button>
                </div>
            </div>
            
            {/* 🔑 Client-side Script for Modal Management and Selection */}
            {html`
                <script>
                    (function() {
                        const modal = document.getElementById('${modalId}');
                        if (!modal) return;
                        
                        // 1. Open/Close Modal Handlers
                        document.body.addEventListener('click', (e) => {
                            const openBtn = e.target.closest('[data-open-modal="${modalId}"]');
                            const closeBtn = e.target.closest('.close-modal-btn');
                            
                            if (openBtn) {
                                modal.classList.remove('hidden');
                                modal.classList.add('flex');
                                document.body.style.overflow = 'hidden';
                            } else if (closeBtn && closeBtn.dataset.modalId === '${modalId}') {
                                modal.classList.remove('flex');
                                modal.classList.add('hidden');
                                document.body.style.overflow = 'auto';
                            }
                        });

                        // 2. Image Selection Handler (Event Delegation)
                        // This fires when a user clicks an image in the grid loaded by HTMX
                        modal.addEventListener('click', (e) => {
                            const imageTile = e.target.closest('[data-file-path]');
                            if (imageTile) {
                                const filePath = imageTile.dataset.filePath;
                                const fileAlt = imageTile.dataset.fileAlt || '';
                                
                                // 🅰️ Populate the main image path input
                                const targetInput = document.querySelector('input[name="${targetInputName}"]');
                                if (targetInput) {
                                    targetInput.value = filePath;
                                }

                                // 🅱️ Optionally populate the related Alt Text field
                                const altTextName = '${targetInputName}'.replace('[path]', '[alt]');
                                const altInput = document.querySelector('input[name="' + altTextName + '"]');
                                if (altInput) {
                                    altInput.value = fileAlt;
                                }
                                
                                // Close the modal
                                modal.classList.remove('flex');
                                modal.classList.add('hidden');
                                document.body.style.overflow = 'auto';
                            }
                        });
                    })();
                </script>
            `}
        </div>
    );
};