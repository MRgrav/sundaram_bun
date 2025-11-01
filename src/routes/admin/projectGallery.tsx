import { FC } from "hono/jsx";
import { AdminLayout } from "../../components/layouts/AdminLayout";
// Assuming this is your PocketBase client
import { pb } from "../../lib/pocketbase"; 
import { ImageDetails, PageRecord } from "../../types/cms";

// --- CONFIG CONSTANTS (Must match your PocketBase setup) ---
const MEDIA_COLLECTION_NAME = 'media'; 
const MEDIA_FILE_FIELD = 'file'; // The actual file field name on the 'media_assets' record
const PAGES_COLLECTION_NAME = 'pages';
// -----------------------------------------------------------

// --- TYPE DEFINITIONS for Expanded Media Record (Used when expanding the gallery relation) ---
// Note: This structure is what PocketBase returns when expanding the 'gallery' relation.
interface MediaRecord {
    id: string; // The primary key of the media_assets record
    collectionId: string; // The collection ID of 'media_assets'
    [MEDIA_FILE_FIELD]: string; // The actual filename/ID string
    alt?: string; 
}

// --- SUB-COMPONENT: Gallery Card ---

interface GalleryCardProps {
    mediaRecord: MediaRecord;
    pageId: string;
}

/**
 * Renders a single image card with HTMX-powered deletion logic.
 */
const GalleryCard: FC<GalleryCardProps> = ({ pageId, mediaRecord }) => {
    
    // API endpoint for deletion removes the link between the page and the media record
    const DELETE_ENDPOINT = `/adi/gallery/delete/${pageId}/${mediaRecord.id}`;
    
    // --- CRITICAL: MANUAL URL CONSTRUCTION for RELATED FILE ---
    // Format: /api/files/{mediaCollectionId}/{mediaRecordId}/{mediaFileFieldName}/{filename}
    // We use the ID and Collection ID *from the expanded media record*
    const imageUrl = `${process.env.POCKETBASE_URL}/api/files/${MEDIA_COLLECTION_NAME}/${mediaRecord.id}/${mediaRecord[MEDIA_FILE_FIELD]}?thumb=300x300`;
    // --------------------------------------------------------

    return (
        // Use the Media Record ID for the HTMX target
        <div id={`gallery-item-${mediaRecord.id}`} class={"relative p-1 border rounded shadow-sm group aspect-4/3 overflow-hidden bg-gray-100"}>
            
            {/* Image Display */}
            <img 
                src={imageUrl} 
                alt={mediaRecord.alt || `Gallery Image: ${mediaRecord.id}`}
                class={"w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"} 
                onError={(e: any) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x225/fecaca/991b1b?text=Broken+URL'; }}
            />

            {/* Delete Button Overlay */}
            <div className={"absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-2"}>
                
                <button
                    type="button"
                    class={"px-2 py-0.5 bg-red-600 text-white font-semibold text-sm rounded shadow hover:bg-red-700 transition"}
                    // HTMX Request to delete this specific image
                    hx-delete={DELETE_ENDPOINT}
                    // Target and swap out the entire card upon successful deletion (204 response)
                    hx-swap="outerHTML" 
                    hx-target={`#gallery-item-${mediaRecord.id}`}
                    // Use hx-confirm for a quick, HTMX-handled confirmation (no alert needed)
                    hx-confirm={`Are you sure you want to remove this image link (ID: ${mediaRecord.id.slice(0, 5)}...)?`}
                >
                    Remove
                </button>
            </div>
        </div>
    );
}

// --- MAIN PAGE COMPONENT ---

export const PageGallery: FC<{ pageId:string }> = async ({pageId}) => {

    const PAGE_COLLECTION = PAGES_COLLECTION_NAME;
    
    try {
        const record = await pb.collection(PAGE_COLLECTION).getOne(pageId, {
            expand: 'gallery',
        });

        // Extend the PageRecord type to include the expanded media records in the gallery field
        type ExpandedPageRecord = PageRecord & {
            expand?: {
                gallery?: MediaRecord[];
            }
        };

        const rawRecord = record as unknown as ExpandedPageRecord; 
        
        // Ensure galleryItems is an array of MediaRecord objects
        const galleryItems: MediaRecord[] = rawRecord.expand?.gallery ?? [];

        // HTMX Endpoint for the two-step relation upload
        const GALLERY_ADD_ENDPOINT = `/adi/cms/gallery/upload-relation/${pageId}`; 
        
        return (
            <AdminLayout title="Gallery Editor">

                {/* Container for the entire section to enable easy HTMX reload */}
                {/* The API route's success script triggers a 'load' event on this ID */}
                <div id="gallery-section-container" class={"p-4 rounded bg-white shadow mb-6"}>
                    <h2 class={"font-semibold uppercase text-zinc-600 text-lg mb-3 border-b pb-2"}>
                        Image Gallery ({galleryItems.length} Images)
                    </h2>
                    
                    {/* --- HTMX File Upload Form --- */}
                    {/* <form 
                        hx-post={`/adi/gallery/${pageId}`}
                        hx-encoding="multipart/form-data" 
                        hx-target="#upload-status-gallery" 
                        hx-swap="outerHTML"
                        className="mb-6 border-b pb-4"
                    >
                        <label className="block w-full text-center py-4 border-2 border-dashed border-gray-300 hover:border-indigo-500 transition cursor-pointer rounded-lg bg-indigo-50">
                            <span className="text-indigo-700 font-semibold flex items-center justify-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 4-4z" clipRule="evenodd" /></svg>
                                <span>Click to Select & Upload New Image</span>
                            </span>
                            <input 
                                type="file" 
                                name="file" // Must match the name expected by the Hono API route
                                accept="image/*" 
                                required 
                                className="hidden"
                                // Automatically submit the form when a file is selected
                                hx-trigger="change" 
                            />
                        </label>
                         Status message container
                        <div id="upload-status-gallery" class="mt-2"></div>
                    </form> */}
                    <div>
                        <form method="post" action={`/adi/gallery/${pageId}`} enctype="multipart/form-data" class={"flex border-2 rounded-lg border-blue-500 gap-4 mb-4"} >
                            <label htmlFor="fileInput" class={"grow p-2"}>
                                <input type={"file"} name="mediaImage" id="fileInput" accept="image/*" required />
                            </label>
                            <button type="submit" class={"px-4 py-1 bg-blue-500 text-white font-semibold rounded"}>Upload</button>
                        </form>
                    </div>
                    
                    {/* --- Image Grid --- */}
                    <div class={"grid sm:grid-cols-2 lg:grid-cols-4 gap-4"}>
                        {galleryItems.length > 0 ? (
                            galleryItems.map((item) => (
                                <GalleryCard 
                                    key={item.id} 
                                    mediaRecord={item} 
                                    pageId={pageId} 
                                />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 p-8 border border-dashed rounded-lg">
                                No images have been linked to this gallery yet.
                            </p>
                        )}
                    </div>
                </div>
            </AdminLayout>
        );
    } catch (e) {
        console.error("Error fetching gallery data:", e);
        return (
            <AdminLayout title="Gallery Error">
                 <div class="p-4 text-red-700 bg-red-100 border border-red-300 rounded-lg m-4">
                    <p class='font-bold'>Data Fetch Error</p>
                    <p>Could not load gallery data for page ID: {pageId}.</p>
                </div>
            </AdminLayout>
        );
    }
}
