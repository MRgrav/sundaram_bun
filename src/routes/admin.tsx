import { Hono } from 'hono';
import { html } from 'hono/html';

// --- ASSUMED IMPORTS & MOCK DATA ---

// 1. Assumed Imports from the modular structure
// Note: In a real project, these would be separate files. Defined as mock components here.
import { FC } from 'hono/jsx';
import { AdminLayout } from '../components/layouts/AdminLayout';
import { PageRecord } from '../types/cms';
import { MetaSection } from '../components/cms/MetaSection';
import { HeroSection } from '../components/cms/HeroSection';
import { MapSection } from '../components/cms/MapSection';
import { LocationBenefitsSection } from '../components/cms/LocationBenefitsSection';
import { ImageGallerySection } from '../components/cms/ImageGallerySection';
import { FeatureAmenitySection } from '../components/cms/FeatureAmenitySection';
import { pb } from '../lib/pocketbase';


const store = new Map<string, PageRecord>();

// --- COMPONENT STUBS (TO SATISFY IMPORTS) ---
// These stubs replace the actual imported components, which would handle the forms.
// We must assume they exist and accept the correct props.

// Helper to create required stubs for compilation
// const SectionStub: FC<{ pageId: string; data: any }> = ({ pageId, data }) => (
//     <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
//         [Component Stub: {data.id || data.title || 'Section'} - Full implementation required in separate file.]
//     </div>
// );

// Mapped stubs
// const HeroSection: FC<any> = (props) => <SectionStub {...props} />;
// const MapSection: FC<any> = (props) => <SectionStub {...props} />;
// const LocationBenefitsSection: FC<any> = (props) => <SectionStub {...props} />;
// const FeatureAmenitySection: FC<any> = (props) => <SectionStub {...props} />;
// const MetaSection: FC<any> = (props) => <SectionStub {...props} />;
// const GallerySection: FC<any> = (props) => <SectionStub {...props} />;



// --- CORE PAGE COMPONENT ---

/**
 * Orchestrates the rendering of all individual CMS sections.
 * This is the component called by the Hono route after fetching and parsing data.
 */
export const PageSettings: FC<{ pageId: string, pageData: PageRecord }> = ({ pageId, pageData }) => {
    const { 
        title='', meta_title='', meta_description='', 
        hero_heading='', hero_subheading='', hero_address='', hero_highlight_one='', hero_highlight_two='', hero_image='',
        map_url='', map_description='',
        feature_amenities_section, location_benefits_section=[],
        gallery=[]
    } = pageData;
    
    // const pageId = pageData.id;

    return (
        <AdminLayout title={`CMS Edit: ${title}`}>
            <div class={"space-y-6"}>
                <h1 className="text-xl font-bold text-gray-700">Page ID: {pageId}</h1>

                {/* Meta Section */}
                <MetaSection 
                    pageId={pageId} 
                    data={{ title, meta_title, meta_description }}
                />
                
                {/* Hero Section */}
                <HeroSection 
                    pageId={pageId} 
                    data={{ 
                        hero_heading, hero_subheading, hero_address, 
                        hero_highlight_one, hero_highlight_two, hero_image 
                    }}
                />
                
                {/* Map Section */}
                <MapSection 
                    pageId={pageId} 
                    data={{ map_url, map_description }} 
                />

                {/* Location Benefits Section (JSON Array) */}
                <LocationBenefitsSection 
                    pageId={pageId} 
                    data={location_benefits_section} 
                />

                {/* Feature Amenities Section (JSON Object) */}
                {/* <FeatureAmenitySection 
                    pageId={pageId} 
                    data={feature_amenities_section} 
                /> */}

                {/* Image Gallery Section (Multi-Relation Field) */}
                {/* <ImageGallerySection 
                    pageId={pageId} 
                    data={gallery} 
                /> */}
                
                <div className="pt-8 text-center text-sm text-gray-400">
                    CMS architecture: Hono route fetches data, PageSettings component renders sections, HTMX handles save operations.
                </div>
            </div>
        </AdminLayout>
    );
};


// --- HONO ROUTE HANDLER ---

const admin = new Hono();

/**
 * GET /admin/page/:pageId
 * 1. Simulates PocketBase fetch of the Page Record.
 * 2. Parses any necessary JSON fields (already done in mock data here).
 * 3. Renders the main page view using PageSettings.
 */
// admin.get('/page/:pageId', (c) => {
//     const pageId = c.req.param('pageId');

//     // --- POCKETBASE FETCH SIMULATION ---
//     // In a real app: const pageRecord = await pb.collection('pages').getOne(pageId, { expand: 'hero_image, gallery_items' });
//     const pageData = store.get(pageId); 

//     if (!pageData) {
//         c.res.headers.set('Content-FC', 'text/html');
//         return c.html(html`
//             <div class="p-8 text-red-700 bg-red-100 border border-red-300 rounded-lg m-8 max-w-4xl mx-auto">
//                 <h2 class='font-bold text-lg'>Data Error</h2>
//                 <p>Could not load page data for ID: ${pageId}.</p>
//                 <p class='text-sm mt-2'>Please ensure the ID is valid and the record exists in PocketBase.</p>
//             </div>
//         `);
//     }

//     // This returns the full HTML document, leveraging AdminLayout (via PageSettings)
//     return c.html(
//         <html lang="en">
//             <head>
//                 <meta charset="UTF-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//                 <title>CMS Edit: {pageData.title}</title>
//                 <script src="https://cdn.tailwindcss.com"></script>
//                 <script src="https://unpkg.com/htmx.org@1.9.10" defer></script> 
//                 <link rel="preconnect" href="https://fonts.googleapis.com" />
//                 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//                 <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
//             </head>
//             <body>
//                 <PageSettings pageData={pageData} />
//             </body>
//         </html>
//     );
// });




// export default admin;

