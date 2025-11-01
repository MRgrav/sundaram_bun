import { RichTextDisplay } from "../../components/cms/RichText";
import { ImageGallery } from "../../components/ImageGallery";
import { Layout } from "../../components/layouts/Layout";
import { pb } from "../../lib/pocketbase";
import { FeatureAmenity, FeatureBlock, ImageDetails, LocationBenefit, PageRecord, PremiumBenefitBlock } from "../../types/cms";

const locationBenefits = [
  {
    iconPath: '/icons/train-fill.svg',
    distance: "1 km",
    label: "Jorhat Town Railway Station",
  },
  {
    iconPath: '/icons/plane-fill.svg',
    distance: "5 km",
    label: "Jorhat Airport",
  },
  {
    iconPath: '/icons/bus-2-fill.svg',
    distance: "2.8 km",
    label: "ISBT Jorhat",
  },
  {
    iconPath: '/icons/hospital-fill.svg',
    distance: "2.2 km",
    label: "Jorhat Medical College & 'Hospital'",
  },
  {
    iconPath: '/icons/graduation-cap-fill.svg',
    distance: "5.8 km",
    label: "Air Force School Jorhat",
  },
  {
    iconPath: '/icons/shopping-cart-2-fill.svg',
    distance: "1.7 km",
    label: "Vishal Mega Mart",
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
        label: "Bedrooms, Living & Dining",
        description: " Premium vitrified tiles in all units."
      },
      {
        label: "Balcony & Sit-Out",
        description: " Durable, easy to maintain, and stain-resistant surface."
      },
      {
        label: "Toilet Floors",
        description: " Adds a modern and elegant look to all living spaces."
      },
    ]
  },
  {
    title: "Kitchen",
    benefits: [
      {
        label: "Elegant Tiles",
        description: " Durable granite countertop for a sleek, easy-to-clean workspace."
      },
      {
        label: "Durable Sink",
        description: " High-quality stainless steel (S.S.) sink for long-lasting use."
      },
      {
        label: "Premium Faucet",
        description: " Thoughtfully designed for functionality and modern living."
      },
    ]
  },
  {
    title: "Paint",
    benefits: [
      {
        label: "Internal Putty",
        description: " Interior walls: smooth plaster with two coats of putty and primer."
      },
      {
        label: "Interior Emulsion",
        description: " Exterior walls: double coat plaster with weatherproof textured paint."
      },
      {
        label: "Exterior Emulsion",
        description: " Facade finished as per architect’s design for a stylish look."
      },
    ]
  },
  {
    title: "Door and Windows",
    benefits: [
      {
        label: "Main Door",
        description: " Main doors: laminated, 3’6″ wide with wooden frames and safety locks."
      },
      {
        label: "Internal Doors",
        description: " Bedroom doors: laminated flush doors, 3′ wide with wooden frames."
      },
      {
        label: "Toilet Doors",
        description: " Aluminum-framed windows for durability and low maintenance."
      },
    ]
  },
  {
    title: "Electrical",
    benefits: [
      {
        label: "Distribution Board",
        description: " Concealed premium-quality ISI-marked wiring for safety and durability."
      },
      {
        label: "MCBs",
        description: " Branded modular switches for modern aesthetics and reliability."
      },
      {
        label: "Switches",
        description: " Individual MCB panel for each unit ensuring electrical safety and easy maintenance."
      },
    ]
  },
  {
    title: "Bathroom",
    benefits: [
      {
        label: "EWC",
        description: " Premium sanitary ware and C.P. fittings for quality and style."
      },
      {
        label: "Wash Basin",
        description: " Designer floor tiles and wall tiles installed up to door height."
      },
      {
        label: "Wall Plate",
        description: " Stylish, durable, and easy-to-clean finishes."
      },
    ]
  }
];
const flatSizes = [
  {
    type: "1 BHK",
    size: "574.00 sq. ft.",
  },
  {
    type: "2 BHK",
    size: "788.00 sq. ft.",
  },
  {
    type: "2 BHK",
    size: "1045.00 sq. ft.",
  },
  {
    type: "2 BHK",
    size: "1062.00 sq. ft.",
  },
  {
    type: "2 BHK",
    size: "1070.00 sq. ft.",
  },
  {
    type: "3 BHK",
    size: "1236.00 sq. ft.",
  },
  {
    type: "3 BHK",
    size: "1265.00 sq. ft.",
  },
  {
    type: "3 BHK",
    size: "1270.00 sq. ft.",
  },
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
    file: '/images/sky_link_heights/sdimg.jpg',
    alt: 'Sky Link Heights',
    id: '1'
  },
  {
    file: '/images/sky_link_heights/sky-link-heights-1-sm.avif',
    alt: 'Sky Link Heights',
    id: '2'
  },
  {
    file: '/images/sky_link_heights/sky-link-heights-3-sm.avif',
    alt: 'Sky Link Heights',
    id: '3'
  },
  {
    file: '/images/sky_link_heights/sky-link-heights-4.avif',
    alt: 'Sky Link Heights',
    id: '4'
  },
  {
    file: '/images/sky_link_heights/sky-link-heights-2.avif',
    alt: 'Sky Link Heights',
    id: '5'
  },
  {
    file: '/images/sky_link_heights/master-plan.avif',
    alt: 'master plan | Sky Link Heights',
    id: '6'
  },
  {
    file: '/images/sky_link_heights/1BHK-unit-c.avif',
    alt: 'Sky Link Heights',
    id: '7'
  },
  {
    file: '/images/sky_link_heights/2BHK-unit-b.avif',
    alt: 'Sky Link Heights',
    id: '8'
  },
  {
    file: '/images/sky_link_heights/2BHK-unit-c.avif',
    alt: 'Sky Link Heights',
    id: '9'
  },
  {
    file: '/images/sky_link_heights/2BHK-unit-d.avif',
    alt: 'Sky Link Heights',
    id: '10'
  },
  {
    file: '/images/sky_link_heights/3BHK-flat-a.avif',
    alt: 'Sky Link Heights',
    id: '11'
  },
  {
    file: '/images/sky_link_heights/3BHK-flat-b.avif',
    alt: 'Sky Link Heights',
    id: '12'
  },
  {
    file: '/images/sky_link_heights/3BHK-flat-c.avif',
    alt: 'Sky Link Heights',
    id: '13'
  },
  {
    file: '/images/sky_link_heights/3BHK-flat-d.avif',
    alt: 'Sky Link Heights',
    id: '14'
  },
  {
    file: '/images/sky_link_heights/3BHK-unit-a.avif',
    alt: 'Sky Link Heights',
    id: '15'
  },
  {
    file: '/images/sky_link_heights/3BHK-unit-d.avif',
    alt: 'Sky Link Heights',
    id: '16'
  },
  {
    file: '/images/sky_link_heights/3BHK-unit-e.avif',
    alt: 'Sky Link Heights',
    id: '17'
  }
]


export const SkyLinkHeights = async () => {
  const record = await pb.collection('pages').getOne('fsp5ofj8w78q3fr', {
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
      title={recordData?.meta_title || "Sky Link Heights | Sundaram Developers | Smart Homes in Jorhat & Guwahati"}
      description={recordData?.meta_description || "Building modern, sustainable homes in Jorhat and Guwahati. Explore our premium 1BHK, 2BHK, and 3BHK projects."}
      image="/logo.png"
      url="https://www.sundaramdevelopers.in/sky-link-heights"
      keywords="Sundaram Developers, flats in Assam, Jorhat apartments, smart homes, sky link heights, apartments"
    >
      {/* hero section */}
      <section class="w-full min-h-[65vh] flex items-center px-6 py-10 bg-linear-to-bl from-blue-800/80 to-sky-400/70">
        <div class="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: minimal text */}
          <div class="md:col-span-6 text-blue-950 md:mb-20">
            <p class="text-lg text-slate-50 mb-2">{recordData?.hero_subheading || 'Modern Living in Jorhat'}</p>
            <h1 class="text-4xl font-extrabold mb-5">{recordData?.hero_heading || 'Sky Link Heights'}</h1>
            <div class="flex items-center gap-3">
              {recordData?.hero_highlight_one && (
                <div class="flex items-center gap-2 bg-slate-50/60 border border-slate-100 rounded-full px-3 py-1 text-sm">
                  <svg class="w-4 h-4 text-sky-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" />
                  </svg>
                  <span>{recordData?.hero_highlight_one}</span>
                </div>
              )}

              {recordData?.hero_highlight_two && (
                <div class="flex items-center gap-2 bg-slate-50/60 border border-slate-100 rounded-full px-3 py-1 text-sm">
                  <svg class="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2l3 6 6 .5-4.5 4 1 6L12 17l-5.5 2.5 1-6L3 8.5 9 8 12 2z" />
                  </svg>
                  <span>{recordData?.hero_highlight_two}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: modern rounded card */}
          <div class="md:col-span-6 flex justify-center md:justify-end">
            <div
              class="w-full max-w-[400px] md:max-w-md relative"
              style={{
                borderRadius: "72% 28% 38% 62% / 83% 30% 70% 17% ",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(2,6,23,0.25)",
              }}
            >
              <img
                src="/images/sky_link_heights/sdimg_sm.png"
                alt="Sky Link Heights"
                class="w-full h-100 object-cover block"
              />

              <div class="absolute left-8 bottom-18 bg-white/90 backdrop-blur-sm shadow rounded-full px-3 py-1.5 flex items-center gap-2 text-sm">
                <span class="font-medium text-slate-900">Sky Link Heights</span>
              </div>
            </div>
          </div>
          <div class={"flex md:col-span-12 font-semibold"}>
            <div class="flex items-center gap-2 text-slate-800 md:-mt-20">
              <svg class="w-5 h-5 text-rose-500 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              <span>{recordData?.hero_address || 'Assam'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section class="bg-sky-600 py-16 px-4">
        <h2 class="text-3xl font-bold text-white text-center kanit-semibold">Welcome to {recordData?.title || 'Sky Link Heights'}</h2>
        <div class="container mx-auto grid md:grid-cols-2 gap-6 my-8">
          <div class="w-full h-[320px] rounded-lg overflow-hidden shadow-lg">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.7676223683775!2d91.72310484578604!3d26.106503218366043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5d57ce4e1d6b%3A0x3448edcd871820a3!2sDivine%20Green%20Apartment!5e0!3m2!1sen!2sin!4v1760332643867!5m2!1sen!2sin" class="w-full h-full" style="border:0;" allowfullscreen={true} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div class="flex flex-col justify-center gap-6 leading-8 text-white text-lg">
            {recordData.map_description ? (
              <RichTextDisplay
                htmlContent={recordData.map_description}
              />
            ) : (
              <p>{recordData.meta_description}</p>
            )}
            <div class="pt-8">
              {/* <a href="Brochure" download="true" class=" bg-orange-500 text-white font-semibold px-4 py-2 rounded-md shadow hover:shadow-xl hover:scale-95 shadow-blue-800">Download Brochure</a> */}
            </div>
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
          {features_amenities && features_amenities
            .map((item, index) => (
              <div class="p-4 rounded-md hover:shadow-lg" key={index}>
                <label class={"text-left text-2xl text-blue-600 mb-6"}>{item.title}</label>
                {item?.features && item.features
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
                  {item.benefits
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