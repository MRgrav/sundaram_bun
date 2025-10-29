import { FC } from 'hono/jsx';
import { svgIcons } from '../../lib/staticData';

// --- Interfaces ---

interface LocationBenefitsSectionProps {
    pageId: string;
    // data will be an array of LocationBenefitItem, often sparse or null
    data: LocationBenefitItem[];
}

interface LocationBenefitRowProps {
    item: LocationBenefitItem;
    index: number;
    pageId: string;
}

interface LocationBenefitItem {
    iconPath: string;
    distance: string;
    label: string;
}

// --- Dynamic Row Component (Kept the same structure but note the fixed indexing now) ---

/**
 * Renders a single, editable row for a Location Benefit.
 */
export const LocationBenefitRow: FC<LocationBenefitRowProps> = ({ item, index, pageId }) => {
    // The key format for PocketBase JSON array fields is fieldName[index].property
    const fieldNamePrefix = `location_benefits_section[${index}]`;

    return (
        // Using a flex layout for better alignment in the fixed list context
        <div className="flex space-x-3 p-3 border border-gray-200 rounded-lg bg-white items-start">
            <span className="mt-2 text-sm font-semibold text-gray-500 w-8 shrink-0">#{index + 1}</span>
            
            {/* 1. Icon Path Input */}
            <div className="flex-1">
                <label htmlFor={`${fieldNamePrefix}.iconPath`} className="block text-xs font-medium text-gray-500">
                    Icon Path (e.g., bus.svg)
                </label>
                {/* <input
                    type="text"
                    name={`${fieldNamePrefix}[iconPath]`}
                    id={`${fieldNamePrefix}.iconPath`}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                    value={item.iconPath || ''} // Ensure value is safe
                    placeholder="bus.svg"
                /> */}
                <select
                    name={`${fieldNamePrefix}[iconPath]`}
                    id={`${fieldNamePrefix}.iconPath`}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                >
                    {svgIcons && svgIcons.map((icon, index)=>(
                        <option value={icon.path} selected={icon.path === item.iconPath} key={index}>{icon.name}</option>
                    ))}
                </select>
            </div>
            
            {/* 2. Distance Input */}
            <div className="w-20">
                <label htmlFor={`${fieldNamePrefix}.distance`} className="block text-xs font-medium text-gray-500">
                    Distance
                </label>
                <input
                    type="text"
                    name={`${fieldNamePrefix}[distance]`}
                    id={`${fieldNamePrefix}.distance`}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                    value={item.distance || ''}
                    placeholder="50m"
                />
            </div>

            {/* 3. Label Input */}
            <div className="flex-2">
                <label htmlFor={`${fieldNamePrefix}.label`} className="block text-xs font-medium text-gray-500">
                    Label
                </label>
                <input
                    type="text"
                    name={`${fieldNamePrefix}[label]`}
                    id={`${fieldNamePrefix}.label`}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                    value={item.label || ''}
                    placeholder="Transit Stop"
                />
            </div>
            {/* REMOVED: Delete button is unnecessary in a fixed list */}
        </div>
    );
};


// --- Main Section Component (FIXED 6 ITEMS) ---

export const LocationBenefitsSection: FC<LocationBenefitsSectionProps> = ({ pageId, data }) => {
    const SECTION_KEY = 'location-benefits-section';
    const API_ENDPOINT = `/adi/cms/${SECTION_KEY}/${pageId}`;
    
    // Define exactly 6 empty objects to force the creation of 6 rows
    const FIXED_COUNT = 6;
    const blankItem: LocationBenefitItem = { iconPath: '', distance: '', label: '' };
    const fixedBenefits = Array.from({ length: FIXED_COUNT }, (_, index) => {
        // Use existing data if available, otherwise use a blank item
        return data && data[index] || blankItem;
    });

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Location Benefits (Fixed 6 Items)</h2>
            <div className="mb-4">
                <span id={`status-${SECTION_KEY}`} className="text-sm"></span>
            </div>

            {/* --- HTMX Form for Saving ALL Benefits --- */}
            <form 
                hx-post={API_ENDPOINT} 
                hx-trigger="submit"
            >
                {/* --- Container for the 6 fixed benefits --- */}
                <div id="benefits-list" className="space-y-4 mb-6">
                    {/* Render the 6 fixed rows */}
                    {fixedBenefits.map((item, index) => (
                        <LocationBenefitRow 
                            key={index}
                            item={item} 
                            index={index} 
                            pageId={pageId} 
                        />
                    ))}
                </div>

                {/* REMOVED: The Add New Benefit Button */}

                <div className="mt-6 flex justify-end items-center space-x-4">
                    <span className="htmx-indicator hidden text-sm text-gray-500">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Saving...
                    </span>
                    <button 
                        type="submit" 
                        class="px-6 py-2 border border-green-600 bg-green-300 text-green-800 font-semibold rounded hover:bg-green-400 transition duration-150 shadow-md"
                    >
                        Save Benefits
                    </button>
                </div>
            </form>
        </div>
    );
};
