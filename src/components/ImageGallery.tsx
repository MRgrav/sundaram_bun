import { html } from "hono/html";
import type { FC } from "hono/jsx";

// Define the shape of the image data
interface GalleryImage {
  src: string;
  alt: string;
}

export const ImageGallery: FC<{ images: GalleryImage[] }> = ({ images }) => (
  <div class="container mx-auto px-4 py-8">
    {/* Image Grid */}
    <div
      id="gallery-grid"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {images.map((image) => (
        // 👇 FIX 1: Add the click target class to the parent div
        <div class="gallery-item group relative cursor-pointer overflow-hidden rounded-lg shadow-md">
          <img
            // 👇 FIX 2: Remove the click target class from the img itself (it's redundant here)
            src={image.src}
            alt={image.alt}
            // Add a specific ID for robust JS targeting
            id={`img-${image.alt.replace(/\s/g, '-')}`}
            class="w-full h-full object-cover aspect-square transform transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
      ))}
    </div>

    {/* Full-screen Modal (Unchanged) */}
    <div
      id="image-modal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300"
    >
      <div class="relative w-11/12 max-w-4xl max-h-[90vh] p-4">
        <img
          id="modal-img"
          src=""
          alt=""
          class="w-full h-full max-h-[90vh] object-contain"
        />
      </div>
      <button
        id="modal-close"
        aria-label="Close image viewer"
        class="absolute top-4 right-4 text-white/80 hover:text-white transition-transform duration-200 hover:scale-125"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    {/* Client-side script for interactivity */}
    {html`
      <script>
        // IIFE for scope isolation (good practice)
        (function() {
          const galleryGrid = document.getElementById('gallery-grid');
          const modal = document.getElementById('image-modal');
          const modalImg = document.getElementById('modal-img');
          const modalClose = document.getElementById('modal-close');
          let currentImageElement = null; // To hold the currently viewed image element (if needed for navigation)

          // --- Functions to control modal ---
          const openModal = (src, alt) => {
            modalImg.src = src;
            modalImg.alt = alt;
            modal.classList.remove('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'hidden';
            modal.setAttribute('aria-hidden', 'false');
          };

          const closeModal = () => {
            modal.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'auto';
            modal.setAttribute('aria-hidden', 'true');
          };

          // --- Event Delegation for Gallery Items (FIXED) ---
          if (galleryGrid) {
            galleryGrid.addEventListener('click', (e) => {
              // Target the parent div with class 'gallery-item'
              const container = e.target.closest('.gallery-item');
              
              if (container) {
                // Find the image element within the container
                const img = container.querySelector('img');
                
                if (img) {
                    openModal(img.src, img.alt);
                    // currentImageElement = img; // uncomment if you add next/prev buttons later
                }
              }
            });
          }

          // --- Modal Close Events ---
          if (modalClose) {
            modalClose.addEventListener('click', closeModal);
          }

          if (modal) {
            modal.addEventListener('click', (e) => {
              // Close if click is on the backdrop (modal element itself)
              if (e.target === modal) {
                closeModal();
              }
            });
          }

          document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) {
              closeModal();
            }
          });
        })();
      </script>
    `}
  </div>
);