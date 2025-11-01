import { RichTextDisplay } from "../../components/cms/RichText";
import { ImageGallery } from "../../components/ImageGallery";
import { Layout } from "../../components/layouts/Layout";
import { pb } from "../../lib/pocketbase";
import { FeatureAmenity, FeatureBlock, LocationBenefit, PageRecord, PremiumBenefitBlock } from "../../types/cms";

const locationBenefits = [
  {
    iconPath: '/icons/train-fill.svg',
    distance: "2 km",
    label: "Jorhat Town Railway Station",
  },
  {
    iconPath: '/icons/plane-fill.svg',
    distance: "6 km",
    label: "Jorhat Airport",
  },
  {
    iconPath: '/icons/bus-2-fill.svg',
    distance: "1 km",
    label: "ISBT Jorhat",
  },
  {
    iconPath: '/icons/hospital-fill.svg',
    distance: "5 km",
    label: "Jorhat Medical College & 'Hospital'",
  },
  {
    iconPath: '/icons/graduation-cap-fill.svg',
    distance: "6.9 km",
    label: "Air Force School Jorhat",
  },
  {
    iconPath: '/icons/shopping-cart-2-fill.svg',
    distance: "1.5 km",
    label: "Vishal Mega Mart",
  },
];
const featuresAmenities = [
  {
    //   iconPath: MdGroupWork,
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
    //   iconPath: MdGroupWork,
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
    //   iconPath: MdWifi,
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
    title: "Essential Utilities",
    benefits: [
      {
        label: "24×7 Water Supply",
        description: " through a deep tube well integrated with a high-efficiency iron removal filtration plant,"
      },
      {
        label: "100% Power Backup ",
        description: " for lift, common areas, and water supply systems."
      },
      {
        label: "Common Parking Area",
        description: " at the ground level for shop owners and customers."
      },
    ]
  },
  {
    title: "Interior Finish & Flooring",
    benefits: [
      {
        label: "",
        description: " All commercial units feature vitrified tile flooring (2×2) for a sleek, durable finish."
      },
      {
        label: "",
        description: " Walls finished with POP and primer on the inside; cement paint on the exterior for lasting protection.",
      },
      {
        label: "Staircase and lobby areas ",
        description: " feature anti-skid floor tiles for enhanced safety."
      },
    ]
  },
  {
    title: "Sanitary & Comfort",
    benefits: [
      {
        label: "Individual shop toilets",
        description: " fitted with superior quality CP fittings and full-height designer tiles."
      },
      {
        label: "Common toilet provision",
        description: " on each floor for customer and staff convenience."
      },
    ]
  },
  {
    title: "Doors, Windows & Shutters",
    benefits: [
      {
        label: "Aluminium-framed windows",
        description: " for weather resistance and longevity."
      },
      {
        label: "Rolling shutters",
        description: " for all commercial units, ensuring security and ease of access."
      },
    ]
  },
  {
    title: "Electrical & Safety",
    benefits: [
      {
        label: "",
        description: " Concealed ISI-marked copper wiring with modular switches."
      },
      {
        label: "",
        description: "Minimum two power points per unit, with provision for lighting, A/C, and equipment."
      },
      {
        label: "Fire safety norms",
        description: " compliant construction with designated safety infrastructure."
      },
    ]
  },
  {
    title: "Security & Connectivity",
    benefits: [
      {
        label: "CCTV surveillance ",
        description: " covering all floors for enhanced safety."
      },
      {
        label: "Intercom facility",
        description: " for seamless internal communication."
      },
      {
        label: "Passenger lift",
        description: " provision for easy vertical mobility across all floors."
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

const gallery = [
  {
    src: '/images/pb_arcade/main_img_sm.avif',
    alt: 'P.B Arcade'
  },
  {
    src: '/images/pb_arcade/img_1.avif',
    alt: 'P.B Arcade'
  },
  {
    src: '/images/pb_arcade/img_2.avif',
    alt: 'P.B Arcade'
  },
];

export const PBArcade = async () => {
  const record = await pb.collection('pages').getOne('gt59b3qczvftjf7', {
    expand: 'gallery,hero_image',
  });

  const recordData = record as unknown as PageRecord;

  const location_benefits = recordData?.location_benefits_section as unknown as LocationBenefit[] || locationBenefits;
  const features_amenities = recordData?.feature_amenities_section as unknown as FeatureBlock[] || featuresAmenities;
  const premium_specifications = recordData?.premium_benefits_section as unknown as PremiumBenefitBlock[] || premiumSpecifications;

  return (
    <Layout
      title={recordData?.meta_title || "P.B Arcade | Sundaram Developers | Smart Homes in Jorhat & Guwahati"}
      description={recordData?.meta_description || "Building modern, sustainable homes in Jorhat and Guwahati. Explore our premium 1BHK, 2BHK, and 3BHK projects."}
      image="/images/sky-link-heights-1.avif"
      url="https://sundaramdevelopers.in/sky-link-heights"
      keywords="Sundaram Developers, flats in Assam, Jorhat apartments, smart homes, pb arcade"
    >

      <section class="bg-amber-600 py-16 px-4">
        <h2 class="text-3xl font-bold text-white text-center kanit-semibold">Welcome to P.B Arcade</h2>
        <div class="container mx-auto grid md:grid-cols-2 gap-6 my-8">
          <div class="w-full h-[320px] rounded-lg overflow-hidden shadow-lg">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3794.4305352067395!2d94.209972!3d26.760419!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3746c3fe625e6147%3A0x5fbdd8d4904833dd!2sP%20B%20Arcade!5e1!3m2!1sen!2sin!4v1760430939156!5m2!1sen!2sin" class="w-full h-full" style="border:0;" allowfullscreen={true} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div class="flex flex-col justify-center gap-6 leading-8 text-white text-lg">
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
        </div>
      </section>
      {/* prime location benefits */}
      <section class=" px-4 py-20 text-center bg-zinc-100">
        <h3 class={"mb-8 text-4xl font-semibold"}>Prime Location Benefits</h3>
        <div class={"container mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4"}>
          {location_benefits && location_benefits
            .map((item, index) => (
              <div class="p-4 flex flex-col items-center justify-center gap-2 rounded-md hover:shadow-lg" key={index}>
                <img src={item.iconPath} class={"h-12 w-12 mb-2 icon-orange-400"} />
                {/* {item.icon} */}
                <label class={"font-semibold text-2xl text-amber-600"}>{item.distance}</label>
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
                {item.features
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
                  {item?.benefits && item.benefits
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