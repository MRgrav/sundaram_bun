import { RichTextDisplay } from "../../components/cms/RichText";
import { ImageGallery } from "../../components/ImageGallery";
import { Layout } from "../../components/layouts/Layout";
import { pb } from "../../lib/pocketbase";
import { FeatureAmenity, FeatureBlock, ImageDetails, LocationBenefit, PageRecord, PremiumBenefitBlock } from "../../types/cms";

const locationBenefits = [
    {
        icon: '/icons/train-fill.svg',
        title: "5 km",
        desc: "Dekargaon railway station",
    },
    {
        icon: '/icons/plane-fill.svg',
        title: "9.5 km",
        desc: "Tezpur Airport",
    },
    {
        icon: '/icons/bus-2-fill.svg',
        title: "2.6 km",
        desc: "ASTC Bus Stand Tezpur",
    },
    {
        icon: '/icons/hospital-fill.svg',
        title: "2.3 km",
        desc: "Kanaklata Civil Hospital, Tezpur",
    },
    {
        icon: '/icons/graduation-cap-fill.svg',
        title: "3 km",
        desc: "Sacred Heart Montessori School, Tezpur",
    },
    {
        icon: '/icons/shopping-cart-2-fill.svg',
        title: "2.5 km",
        desc: "Style Baazar, Tezpur",
    },
];
const featuresAmenities = [
    {
        //   icon: MdGroupWork,
        title: "Community Features",
        features: [
            {
                iconPath: '/icons/poker-clubs-fill.svg',
                label: "Clubhouse & Lounge",
            },
            {
                iconPath: '/icons/mickey-fill.svg',
                label: "Children's Play Area",
            },
            {
                iconPath: '/icons/heart-pulse-fill.svg',
                label: "Gym & Fitness Studio",
            },
            {
                iconPath: '/icons/film-fill.svg',
                label: "Multi-purpose Hall",
            }
        ]
    },
    {
        //   icon: MdGroupWork,
        title: "Eco Features",
        features: [
            {
                iconPath: '/icons/contrast-drop-2-line.svg',
                label: "Rain Water Harvesting",
            },
            {
                iconPath: '/icons/sun-fill.svg',
                label: "Solar Panels",
            },
            {
                iconPath: '/icons/lightbulb-flash-fill.svg',
                label: "Energy-efficient Lighting",
            },
            {
                iconPath: '/icons/recycle-fill.svg',
                label: "Recycled Materials",
            }
        ]
    },
    {
        //   icon: MdWifi,
        title: "Smart Features",
        features: [
            {
                iconPath: '/icons/lightbulb-ai-fill.svg',
                label: "Smart Lighting System",
            },
            {
                iconPath: '/icons/door-lock-fill.svg',
                label: "App-based Door Unlock",
            },
            {
                iconPath: '/icons/radar-fill.svg',
                label: "Motion Sensors",
            },
            {
                iconPath: '/icons/webcam-fill.svg',
                label: "WiFi-enabled Security Cameras",
            }
        ]
    }
];
const premiumSpecifications = [
    {
        title: "Flooring",
        benefits: [
            {
                label: "Vitrified tiles",
                description: " in drawing, dining, and bedrooms"
            },
            {
                label: "Marble/anti-skid tiles",
                description: " in common areas"
            },
            {
                label: "PCC casting",
                description: " for parking zones"
            },
        ]
    },
    {
        title: "Kitchen",
        benefits: [
            {
                label: "Marble countertop",
                description: " for a premium, durable finish"
            },
            {
                label: "Ceramic tile cladding",
                description: " up to 2 feet above the counter for easy maintenance"
            },
            {
                label: "Stainless steel (S.S.) sink",
                description: " for longevity and hygiene"
            },
        ]
    },
    {
        title: "Paint",
        benefits: [
            {
                label: "Interior walls",
                description: " : Smooth plaster with putty and primer finish"
            },
            {
                label: "Exterior walls",
                description: " : double coat plaster with weatherproof textured paint."
            },
            {
                label: "Aesthetic facade ",
                description: ": as per architect’s design for a stylish look."
            },
        ]
    },
    {
        title: "Door and Windows",
        benefits: [
            {
                label: "Main &amp; internal doors",
                description: " : Waterproof flush doors with quality accessories"
            },
            {
                label: "Windows",
                description: " : Anodized aluminum sections fitted with 5 mm quality glass"
            },
            {
                label: "",
                description: "Designed for durability, insulation, and low maintenance"
            },
        ]
    },
    {
        title: "Electrical",
        benefits: [
            {
                label: "",
                description: "AC and geyser provision in master bedroom and bathroom"
            },
            {
                label: "",
                description: "Separate MCB panel for each unit"
            },
            {
                label: "",
                description: "Ample lighting in rooms, common areas, and parking"
            },
        ]
    },
    {
        title: "Bathroom",
        benefits: [
            {
                label: "Ceramic wall tiles",
                description: " up to door height and anti-skid floor tiles"
            },
            {
                label: "Hindware/Jaquar",
                description: " or equivalent quality CP fittings"
            },
            {
                label: "",
                description: "Hot and cold water connections in all attached bathrooms"
            },
        ]
    }
];
const specifications = [
    {
        title: "Building",
        desc: "Pile foundation; RCC framed structure"
    }, {
        title: "Flooring",
        desc: "All rooms will have vitrified tiles."
    }, {
        title: "Kitchen",
        desc: "Granite finish conter top."
    }, {
        title: "Toilets",
        desc: "Superior Quality CP fittings with tiles on wall upto door height and floor."
    }, {
        title: "Doors",
        desc: "Wooden frame & readymade flash door. Window Allumininum frames."
    }, {
        title: "Water",
        desc: "24 hrs running water."
    }, {
        title: "Interior walls",
        desc: "Inside wall finish with POP."
    }, {
        title: "Exterior wall",
        desc: "115mm peripheral wall "
    }, {
        title: "Fire safety",
        desc: "Equipped with fire alarm/fighting devices extinguishers fire water reservior."
    }, {
        title: "Electrical fitting",
        desc: "Concealed copper wiring (ISI marked) with modular switches."
    }, {
        title: "Lift",
        desc: "6 passanger lift."
    },
];

const staticGallery = [
    {
        src: '/images/shivashree/shivashree_956x768.avif',
        alt: 'Shivashree Apartment',
        id: '1'
    },
    {
        src: '/images/shivashree/floor_plan_1.webp',
        alt: 'Shivashree Apartment',
        id: '2'
    },
    {
        src: '/images/shivashree/parking.avif',
        alt: 'Shivashree Apartment',
        id: '3'
    },
    {
        src: '/images/shivashree/plan_1.avif',
        alt: 'Shivashree Apartment',
        id: '4'
    },
    {
        src: '/images/shivashree/plan_2.avif',
        alt: 'Shivashree Apartment',
        id: '5'
    },
    {
        src: '/images/shivashree/plan_3.avif',
        alt: 'Shivashree Apartment',
        id: '6'
    },
    {
        src: '/images/shivashree/shivashree_1.avif',
        alt: 'Shivashree Apartment',
        id: '7'
    },
    {
        src: '/images/shivashree/shivashree_2.avif',
        alt: 'Shivashree Apartment',
        id: '8'
    },
    {
        src: '/images/shivashree/shivashree_3.avif',
        alt: 'Shivashree Apartment',
        id: '9'
    },
    {
        src: '/images/shivashree/shivashree_4.avif',
        alt: 'Shivashree Apartment',
        id: '10'
    },
];



export const ShivashreeApartment = async () => {

    const record = await pb.collection('pages').getOne('lcem835wfncqzqi', {
        expand: 'gallery,hero_image',
    });

    const recordData = record as unknown as PageRecord;

    const location_benefits = recordData?.location_benefits_section as unknown as LocationBenefit[] || locationBenefits;
    const features_amenities = recordData?.feature_amenities_section as unknown as FeatureBlock[] || featuresAmenities;
    const premium_specifications = recordData?.premium_benefits_section as unknown as PremiumBenefitBlock[] || premiumSpecifications;
    // console.log(recordData);
    const gallery = recordData?.expand?.gallery as unknown as ImageDetails[] || staticGallery;

    return (
        <Layout
            title={recordData?.meta_title || 'Shivashree Apartment || Sundaram Developers'}
            description={recordData?.meta_description || "Building modern, sustainable homes in Jorhat and Guwahati. Explore our premium 1BHK, 2BHK, and 3BHK projects."}
            image="/logo.png"
            url="https://www.sundaramdevelopers.in/shivashree"
            keywords="Sundaram Developers, flats in Assam, Jorhat apartments, smart homes, shivashree, apartment in tezpur, apartment"
        >

            <section class="bg-indigo-600 py-16 px-4">
                <h2 class="text-3xl font-bold text-white text-center kanit-semibold">Welcome to {recordData.title || 'Shivashree Apartment'}</h2>
                <div class="container mx-auto grid md:grid-cols-2 gap-6 my-8">
                    <div class="w-full h-[320px] rounded-lg overflow-hidden shadow-lg">
                        <div class="w-full h-[320px] rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                src={recordData?.map_url || "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d14265.268822544067!2d92.774339156632!3d26.63832440913618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDM4JzE3LjkiTiA5MsKwNDcnMDQuNyJF!5e0!3m2!1sen!2sin!4v1760427483684!5m2!1sen!2sin"}
                                style="border:0;" allowfullscreen={true} loading="lazy" class="w-full h-full"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>

                    </div>
                    <div class="flex flex-col justify-center gap-6 leading-8 text-white text-lg">
                        {recordData.map_description ? (
                            <RichTextDisplay
                                htmlContent={recordData.map_description}
                            />
                        ) : (
                            <p>{recordData.meta_description}</p>
                        )}
                    </div>
                </div>
            </section>
            {/* prime location benefits */}
            <section class=" px-4 py-20 text-center bg-zinc-100">
                <h3 class={"mb-8 text-4xl font-semibold"}>Prime Location Benefits</h3>
                <div class={"container mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4"}>
                    {location_benefits
                        .map((item, index) => (
                            <div class="p-4 flex flex-col items-center justify-center gap-2 rounded-md hover:shadow-lg" key={index}>
                                <img src={item.iconPath} class={"h-12 w-12 mb-2 icon-blue-400"} />

                                <label class={"font-semibold text-2xl text-blue-600"}>{item.distance}</label>
                                <p class={"text-zinc-700"}>{item.label}</p>
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* features and amenities */}
            <section class="px-4 py-20 bg-white">
                <h3 class={"mb-8 text-4xl font-semibold text-center"}>Features & Amenities</h3>
                <div class={"container mx-auto max-w-7xl w-[80%] grid md:grid-cols-3 gap-4"}>
                    {features_amenities
                        .map((item, index) => (
                            <div class="p-4 rounded-md hover:shadow-lg" key={index}>
                                <label class={"text-left text-2xl text-blue-600 mb-6"}>{item.title}</label>
                                {item?.features
                                    .map((subitem, index2) => (
                                        <div class="p-2 flex items-center justify-start gap-4 " key={index2}>
                                            <img src={subitem.iconPath} class={"h-6 w-6 icon-yellow-400"} />
                                            <p class={"text-zinc-800 text-sm whitespace-nowrap"}>{subitem.label}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* premium benefits */}
            <section class="container mx-auto px-4 py-20 ">
                <h3 class={"mb-8 text-4xl font-semibold text-center"}>Premium Benefits</h3>
                <div class={"grid md:grid-cols-2 gap-6"}>
                    {premium_specifications
                        .map((item, index) => (
                            <div class="p-4 rounded-md " key={index}>
                                <label class={"text-left font-medium text-4xl text-zinc-800 "}>{item.title}</label>
                                <ul class={"list-disc list-inside mt-8"}>
                                    {item?.benefits
                                        .map((subitem, index2) => (
                                            <li class={" text-zinc-800 mb-2"} key={index2}>
                                                {subitem?.label && (<strong>{subitem.label}</strong>)}
                                                <span>{subitem.description}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* image Gallery */}
            <section class="px-4 py-20 bg-white">
                <h3 class={"mb-8 text-4xl font-semibold text-center"}>Image Gallery</h3>
                <ImageGallery images={gallery} />
            </section>
        </Layout>
    )
}