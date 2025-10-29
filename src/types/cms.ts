// src/interfaces/cms.ts

// --- JSON Field Structures ---
export interface LocationBenefit {
    iconPath: string;
    distance: string;
    label: string;
}

export interface FeatureAmenity {
    iconPath: string;
    label: string;
}

export interface PremiumBenefit {
    label?: string;
    description: string;
}

// --- PocketBase Page Record Structure (Expanded) ---
export interface PageRecord {
    // Standard fields
    id?: string; // The primary ID used in the URL
    title?: string;
    meta_title?: string;
    meta_description?: string;
    
    // Hero fields
    hero_heading?: string;
    hero_subheading?: string;
    hero_address?: string;
    hero_highlight_one?: string;
    hero_highlight_two?: string;
    
    // Map fields
    map_url?: string;
    map_description?: string;
    
    // JSON fields (stored as string/JSON in PB, but typed as objects here)
    location_benefits_section?: LocationBenefit[]; 
    feature_amenities_section?: { title: string, features: FeatureAmenity[] };
    premium_benefits_section?: { title: string, benefits: PremiumBenefit[] };

    // Relation fields (Expanded data if requested via expand query)
    hero_image?: string,
    gallery?: string[];
    
}