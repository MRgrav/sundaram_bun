import { Hono } from 'hono';
import { pb } from '../lib/pocketbase';
import { html } from 'hono/html';
import { PageRecord } from '../types/cms';
import { PageSettings } from './admin';

const PAGE_COLLECTION = 'pages';
const MEDIA_COLLECTION = 'media';
const CONTACTS_COLLECTION = 'contacts'; // Defined but not directly used in mock PB
const POCKETBASE_URL = 'http://127.0.0.1:8090'; // Use your actual URL

const api = new Hono();

const DEFAULT_ICONS = ["school.svg", "hospital.svg", "market.svg", "bank.svg"];


// --- MOCK INTERFACES AND CONSTANTS (Define these in src/interfaces/cms.ts) ---

interface FeatureAmenity { iconPath: string; label: string; }
interface LocationBenefit { iconPath: string; distance: string; label: string; }
interface GalleryItem { path: string; alt: string; } // For gallery relation expansion
interface UpdatePayload { [key: string]: any; } // Generic type for PB payload

// MOCK PocketBase client (FIXED: Added 'create' method)
// const pb = {
//     collection: (name: string) => ({
//         // Mock create function (REQUIRED for the contact form)
//         create: async (data: UpdatePayload) => {
//             console.log(`[PB MOCK] Creating ${name} record with:`, data);
//             await new Promise(resolve => setTimeout(resolve, 100));
//             // Simulate PocketBase returning a new record with an ID
//             return { id: `mock_${Math.random().toString(36).substring(2, 9)}`, ...data };
//         },
//         // Mock update function
//         update: async (id: string, data: UpdatePayload) => {
//             console.log(`[PB MOCK] Updating ${name} record ${id} with:`, data);
//             // Simulate network delay
//             await new Promise(resolve => setTimeout(resolve, 100));
//             // Simulate success
//             return { id, ...data }; 
//         },
//         // Mock getList function for media library
//         getList: async (page: number, perPage: number, options: any) => {
//             console.log(`[PB MOCK] Fetching list from ${name}...`);
//             await new Promise(resolve => setTimeout(resolve, 100));
            
//             if (name === MEDIA_COLLECTION) {
//                 return { items: [
//                     { id: 'img_01', file: 'pool.svg', alt: 'Community Pool' },
//                     { id: 'img_02', file: 'gym.svg', alt: 'Indoor Gym' },
//                     { id: 'img_03', file: 'park.svg', alt: 'Childrens Park' },
//                 ]};
//             }
//             return { items: [] };
//         }
//     })
// };
// --- END MOCK ---

/**
 * Helper function to send a custom HTMX trigger response.
 * @param c The Hono context.
 * @param eventName The custom event name (e.g., 'cms-save-success').
 * @param payload JSON data to include in the event detail.
 * @param status HTTP status code.
 */
const sendTrigger = (c: any, eventName: string, payload: any, status: number = 200) => {
    c.header('HX-Trigger', JSON.stringify({
        [eventName]: payload
    }));
    return c.json({ status: eventName, ...payload }, status);
};

// --- UTILITY FUNCTIONS FOR JSON FIELD PARSING ---

/**
 * Re-assembles Hono's flat form data into a structured FeatureAmenity object.
 * Expects: { title: '...', features: { 0: { iconPath: '...', label: '...' }, ... } }
 */
const parseFeatureAmenities = (formData: any): UpdatePayload => {
    // 1. Extract the title
    const title = formData.title as string || '';

    // 2. Extract and filter the features array from the indexed structure
    const features: FeatureAmenity[] = [];
    const featureMap = formData.features || {};

    // Iterate through numbered keys (0, 1, 2, ...)
    Object.keys(featureMap).forEach(key => {
        const item = featureMap[key] as any;
        if (item.iconPath || item.label) {
            features.push({
                iconPath: item.iconPath as string || '',
                label: item.label as string || '',
            });
        }
    });
    
    return { title, features };
};

/**
 * Re-assembles Hono's flat form data into a structured LocationBenefit array.
 * Expects: { location_benefits: { 0: { iconPath: '...', distance: '...', label: '...' }, ... } }
 */
const parseLocationBenefits = (formData: any): LocationBenefit[] => {
    const benefits: LocationBenefit[] = [];
    const benefitMap = formData.location_benefits_section || {};

    console.log(benefitMap);

    Object.keys(benefitMap).forEach(key => {
        const item = benefitMap[key] as any;
        console.log('items: ', item);
        if (item.iconPath || item.label || item.distance) {
            benefits.push({
                iconPath: item.iconPath as string || '',
                distance: item.distance as string || '',
                label: item.label as string || '',
            });
        }
    });
    return benefits;
};
// type LocationBenefit = { iconPath: string; distance: string; label: string };

// function parseLocationBenefits(formData: Record<string, any>): LocationBenefit[] {
//   const KEY = 'location_benefits_section';

//   // Case A: parser already produced nested object/array
//   const raw = formData[KEY];
//   if (raw && typeof raw === 'object' && !Object.keys(formData).some(k => k.startsWith(`${KEY}[`))) {
//     const arr = Array.isArray(raw) ? raw : Object.keys(raw).map(k => raw[k]);
//     return arr
//       .map((it: any) => ({
//         iconPath: String(it?.iconPath || '').trim(),
//         distance: String(it?.distance || '').trim(),
//         label: String(it?.label || '').trim(),
//       }))
//       .filter(() => true); // keep all entries (including empty) — adjust if you want to drop empties
//   }

//   // Case B: flat bracketed keys like KEY[0][iconPath]
//   const items: Record<number, any> = {};
//   for (const rawKey of Object.keys(formData)) {
//     const m = rawKey.match(new RegExp(`^${KEY}\$$(\\d+)\$$\$$(\\w+)\$$$`));
//     if (!m) continue;
//     const idx = Number(m[1]);
//     const field = m[2];
//     if (!items[idx]) items[idx] = {};
//     items[idx][field] = formData[rawKey];
//   }

//   const result: LocationBenefit[] = Object.keys(items)
//     .map(k => Number(k))
//     .sort((a, b) => a - b)
//     .map(i => items[i])
//     .map((it: any) => ({
//       iconPath: String(it?.iconPath || '').trim(),
//       distance: String(it?.distance || '').trim(),
//       label: String(it?.label || '').trim(),
//     }));

//   return result;
// }



// --- CONTACT FORM SUBMISSION ---
// POST /api/pocketbase/submit-contact
api.post('/pocketbase/submit-contact', async (c) => {
    try {
        // 1. Parse the incoming form data
        const formData = await c.req.parseBody();

        // 2. Extract necessary fields and sanitize/validate
        const name = formData.name?.toString() || '';
        const email = formData.email?.toString() || '';
        const phone = formData.phone?.toString() || '';
        const message_query = formData.message_query?.toString() || '';
        const collectionName = 'client_contact_requests'; // Hardcoded collection name

        // Basic validation
        if (!name || !email || !message_query) {
            return c.json({ error: 'Missing required fields (name, email, message).' }, 400);
        }

        // 3. Prepare the data payload for PocketBase
        const data = {
            "name": name,
            "email": email,
            "phone": phone,
            "message_query": message_query
        };

        // 4. Create the record in PocketBase (Now uses the fixed mock 'create' method)
        const record = await pb.collection(collectionName).create(data);

        // 5. Respond with success
        return c.json({ 
            message: 'Contact request submitted successfully!',
            recordId: record.id 
        }, 201);

    } catch (error) {
        console.error('PocketBase Submission Error:', error);
        
        // Return a generic error message to the client
        return c.json({ 
            error: 'Failed to submit contact request due to a server error.', 
            details: (error as any).message 
        }, 500);
    }
});


// --- 1. META SECTION UPDATE ---
// Handles: title, meta_title, meta_description
api.post('/cms/meta-section/:pageId', async (c) => {
    const pageId = c.req.param('pageId');
    const SECTION_KEY = 'meta-section';
    
    try {
        const formData = await c.req.parseBody();
        
        const updatePayload: UpdatePayload = {
            title: formData.title as string,
            meta_title: formData.meta_title as string,
            meta_description: formData.meta_description as string,
        };
        
        // Remove empty strings to prevent overwriting existing data if field is optional
        Object.keys(updatePayload).forEach(key => {
            if (updatePayload[key] === "") delete updatePayload[key];
        });

        await pb.collection(PAGE_COLLECTION).update(pageId, updatePayload);

        return sendTrigger(c, 'cms-save-success', { pageId, section: SECTION_KEY }, 200);
    } catch (error) {
        console.error(`Error saving ${SECTION_KEY}:`, error);
        return sendTrigger(c, 'cms-save-error', { pageId, section: SECTION_KEY, error: 'Database failed' }, 500);
    }
});


// --- 2. HERO SECTION UPDATE ---
// Handles: hero_heading, hero_subheading, hero_address, hero_highlight_one, hero_highlight_two, hero_image (relation ID)
api.post('/cms/hero-section/:pageId', async (c) => {
    const pageId = c.req.param('pageId');
    const SECTION_KEY = 'hero-section';

    try {
        const formData = await c.req.parseBody();
        
        const updatePayload: UpdatePayload = {
            hero_heading: formData.hero_heading as string,
            hero_subheading: formData.hero_subheading as string,
            hero_address: formData.hero_address as string,
            hero_highlight_one: formData.hero_highlight_one as string,
            hero_highlight_two: formData.hero_highlight_two as string,
            // PocketBase relation fields require the ID or null/empty string
            hero_image: formData.hero_image_id as string || null, 
        };
        
        // Clean payload
        Object.keys(updatePayload).forEach(key => {
            if (updatePayload[key] === "") delete updatePayload[key];
        });

        await pb.collection(PAGE_COLLECTION).update(pageId, updatePayload);

        return sendTrigger(c, 'cms-save-success', { pageId, section: SECTION_KEY }, 200);
    } catch (error) {
        console.error(`Error saving ${SECTION_KEY}:`, error);
        return sendTrigger(c, 'cms-save-error', { pageId, section: SECTION_KEY, error: 'Database failed' }, 500);
    }
});


// --- 3. MAP SECTION UPDATE ---
// Handles: map_url, map_description
api.post('/cms/map-section/:pageId', async (c) => {
    const pageId = c.req.param('pageId');
    const SECTION_KEY = 'map-section';

    try {
        const formData = await c.req.parseBody();
        
        const updatePayload: UpdatePayload = {
            map_url: formData.map_url as string,
            map_description: formData.map_description as string,
        };
        
        // Clean payload
        Object.keys(updatePayload).forEach(key => {
            if (updatePayload[key] === "") delete updatePayload[key];
        });

        const k = await pb.collection(PAGE_COLLECTION).update(pageId, updatePayload);

        console.log(k);

        return sendTrigger(c, 'cms-save-success', { pageId, section: SECTION_KEY }, 200);
    } catch (error) {
        console.error(`Error saving ${SECTION_KEY}:`, error);
        return sendTrigger(c, 'cms-save-error', { pageId, section: SECTION_KEY, error: 'Database failed' }, 500);
    }
});


// --- 4. FEATURE AMENITIES (JSON FIELD) UPDATE ---
// Handles: feature_amenities_section (JSON column)
api.post('/cms/amenities-section/:pageId', async (c) => {
    const pageId = c.req.param('pageId');
    const SECTION_KEY = 'amenities-section';
    const FIELD_NAME = 'feature_amenities_section';

    try {
        const formData = await c.req.parseBody();
        
        // 1. Process structured array data
        const structuredData = parseFeatureAmenities(formData);
        
        // 2. Create the final payload (JSON field must be stringified)
        const updatePayload: UpdatePayload = {
            [FIELD_NAME]: JSON.stringify(structuredData)
        };

        await pb.collection(PAGE_COLLECTION).update(pageId, updatePayload);

        return sendTrigger(c, 'cms-save-success', { pageId, section: SECTION_KEY }, 200);
    } catch (error) {
        console.error(`Error saving ${SECTION_KEY}:`, error);
        return sendTrigger(c, 'cms-save-error', { pageId, section: SECTION_KEY, error: 'JSON parse/save failed' }, 500);
    }
});


// --- 5. LOCATION BENEFITS (JSON FIELD) UPDATE ---
// Handles: location_benefits_section (JSON array column)
// api.post('/cms/location-benefits-section/:pageId', async (c) => {
//     const pageId = c.req.param('pageId');
//     const SECTION_KEY = 'location-benefits-section';
//     const FIELD_NAME = 'location_benefits_section';

//     try {
//         const formData = await c.req.parseBody();
       
//         // 1. Process structured array data
//         const structuredData = parseLocationBenefits(formData);
        
//         // 2. Create the final payload (JSON field must be stringified)
//         const updatePayload: UpdatePayload = {
//             [FIELD_NAME]: JSON.stringify(structuredData)
//         }; 
//         console.log(updatePayload);

//         await pb.collection(PAGE_COLLECTION).update(pageId, updatePayload);

//         return sendTrigger(c, 'cms-save-success', { pageId, section: SECTION_KEY }, 200);
//     } catch (error) {
//         console.error(`Error saving ${SECTION_KEY}:`, error);
//         return sendTrigger(c, 'cms-save-error', { pageId, section: SECTION_KEY, error: 'JSON array save failed' }, 500);
//     }
// });
api.post('/cms/location-benefits-section/:pageId', async (c) => {
    const pageId = c.req.param('pageId');
    const SECTION_KEY = 'location-benefits-section';
    const FIELD_NAME = 'location_benefits_section';

    try {
        const formData = await c.req.parseBody();
       
        // 1. Process structured array data
        const structuredData = parseLocationBenefits(formData);
        
        // 2. Create the final payload (JSON field must be stringified)
        const updatePayload: UpdatePayload = {
            [FIELD_NAME]: JSON.stringify(structuredData)
        }; 

        const formObj: Record<string, any> =
    formData instanceof FormData
      ? Object.fromEntries(formData.entries())
      : (formData as Record<string, any>);

  // Collect 6 items
  const FIXED_COUNT = 6;
  const items: any[] = [];

  for (let i = 0; i < FIXED_COUNT; i++) {
    // field names in your form: location_benefits_section[<i>][iconPath] etc.
    const prefix = `location_benefits_section[${i}]`;
    const iconPath = formObj[`${prefix}[iconPath]`] ?? '';
    const distance = formObj[`${prefix}[distance]`] ?? '';
    const label = formObj[`${prefix}[label]`] ?? '';

    items.push({ iconPath, distance, label });
  }
        console.log(items);
        const payload = {
            location_benefits_section: JSON.stringify(items), // send as string if PB field is text/json
            updatedAt: new Date().toISOString()
          };
      

        await pb.collection(PAGE_COLLECTION).update(pageId, payload);

        return sendTrigger(c, 'cms-save-success', { pageId, section: SECTION_KEY }, 200);
    } catch (error) {
        console.error(`Error saving ${SECTION_KEY}:`, error);
        return sendTrigger(c, 'cms-save-error', { pageId, section: SECTION_KEY, error: 'JSON array save failed' }, 500);
    }
});


// --- 6. IMAGE GALLERY (RELATION ARRAY) UPDATE ---
// Handles: gallery (Multiple relation IDs)
api.post('/cms/gallery-section/:pageId', async (c) => {
    const pageId = c.req.param('pageId');
    const SECTION_KEY = 'gallery-section';

    try {
        const formData = await c.req.parseBody();
        
        // The form should send a repeated field 'gallery[]' containing relation IDs.
        // Hono's parseBody will combine these into an array if named correctly (e.g., gallery: ['id1', 'id2'])
        const galleryIds = Array.isArray(formData.gallery) ? formData.gallery : 
                           (formData.gallery ? [formData.gallery] : []);

        const updatePayload: UpdatePayload = {
            // PocketBase expects an array of relation IDs
            gallery: galleryIds.filter(id => id && typeof id === 'string'), 
        };

        await pb.collection(PAGE_COLLECTION).update(pageId, updatePayload);

        return sendTrigger(c, 'cms-save-success', { pageId, section: SECTION_KEY }, 200);
    } catch (error) {
        console.error(`Error saving ${SECTION_KEY}:`, error);
        return sendTrigger(c, 'cms-save-error', { pageId, section: SECTION_KEY, error: 'Relation update failed' }, 500);
    }
});

// --- 7. MEDIA LIBRARY GET (For Image Selector Modal) ---
// Returns a JSON list of available media assets.
api.get('/cms/load-images', async (c) => {
    try {
        const result = await pb.collection(MEDIA_COLLECTION).getList(1, 50, {
            fields: 'id, file, alt' // Only select necessary fields
        });
        
        // Format the data to include the full public URL
        const images: GalleryItem[] = result.items.map((item: any) => ({
            id: item.id,
            path: `${POCKETBASE_URL}/api/files/${MEDIA_COLLECTION}/${item.id}/${item.file}`,
            alt: item.alt || item.file
        }));

        return c.json({ status: 'success', images }, 200);

    } catch (error) {
        console.error("Error fetching media:", error);
        return c.json({ status: 'error', message: 'Failed to load media assets.' }, 500);
    }
});


api.get('/page/:pageId', async (c): Promise<Response> => {
    const pageId = c.req.param('pageId');

  // --- POCKETBASE FETCH SIMULATION ---
  // In a real app: const pageRecord = await pb.collection('pages').getOne(pageId, { expand: 'hero_image, gallery_items' });
    const rawRecord = await pb.collection('pages').getOne(pageId,{ expand: 'hero_image, gallery'  }); 

    console.log(rawRecord);

    if (!rawRecord) {
      c.res.headers.set('Content-FC', 'text/html');
      return c.html(html`
          <div class="p-8 text-red-700 bg-red-100 border border-red-300 rounded-lg m-8 max-w-4xl mx-auto">
              <h2 class='font-bold text-lg'>Data Error</h2>
              <p>Could not load page data for ID: ${pageId}.</p>
              <p class='text-sm mt-2'>Please ensure the ID is valid and the record exists in PocketBase.</p>
          </div>
      `);
    }

    const pageData = rawRecord as unknown as PageRecord;

    return c.html(
      <>
      <PageSettings pageId={pageId} pageData={pageData}/>
      </>
    );
});

export default api;
