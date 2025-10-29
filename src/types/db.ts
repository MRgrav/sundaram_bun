import { ImageGallery } from './../components/ImageGallery';
export interface page {
    //meta
    title: string;
    //hero section
    heroSection: hero;
    //google map section
    mapSection: map;
    //location benefits
    locationBenefitsSection: locationBenefits[];
    //features and amenities section
    featureAmenitiesSection: featureAmenitiesGroup[];
    //premium benefits
    premiumBenefitsSection: premiumBenefitsGroup[];
    //image gallery
    imageGallery: image[];
}

interface hero {
    heading: string;
    subHeading: string;
    address: string;
    image: image;
}

export interface image {
    path: string;
    alt: string;
}

interface map {
    location: string;
    paragraph: string;
}

interface locationBenefits {
    iconPath: string;
    distance: string;
    label: string;
}

interface featureAmenitiesGroup {
    title: string;
    features: featureAmenities[];
}

interface featureAmenities {
    iconPath: string;
    label: string;
}

export interface premiumBenefitsGroup {
    title: string;
    benefits: premiumBenefits[];
}

interface premiumBenefits {
    label?: string;
    description: string;
}
