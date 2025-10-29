import { ImageGallery } from "../../components/ImageGallery";
import { Layout } from "../../components/layouts/Layout";

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
      list: [
        {
          icon: '/icons/poker-clubs-fill.svg',
          feature: "Clubhouse & Lounge",
        },
        {
          icon: '/icons/mickey-fill.svg',
          feature: "Children's Play Area",
        },
        {
          icon: '/icons/heart-pulse-fill.svg',
          feature: "Gym & Fitness Studio",
        },
        {
          icon: '/icons/film-fill.svg',
          feature: "Multi-purpose Hall",
        }
      ]
    },
    {
    //   icon: MdGroupWork,
      title: "Eco Features",
      list: [
        {
          icon: '/icons/contrast-drop-2-line.svg',
          feature: "Rain Water Harvesting",
        },
        {
          icon: '/icons/sun-fill.svg',
          feature: "Solar Panels",
        },
        {
          icon: '/icons/lightbulb-flash-fill.svg',
          feature: "Energy-efficient Lighting",
        },
        {
          icon: '/icons/recycle-fill.svg',
          feature: "Recycled Materials",
        }
      ]
    },
    {
    //   icon: MdWifi,
      title: "Smart Features",
      list: [
        {
          icon: '/icons/lightbulb-ai-fill.svg',
          feature: "Smart Lighting System",
        },
        {
          icon: '/icons/door-lock-fill.svg',
          feature: "App-based Door Unlock",
        },
        {
          icon: '/icons/radar-fill.svg',
          feature: "Motion Sensors",
        },
        {
          icon: '/icons/webcam-fill.svg',
          feature: "WiFi-enabled Security Cameras",
        }
      ]
    }
];
const premiumSpecifications = [
    {
        title: "Flooring",
        list: [
            {
                label: "Vitrified tiles",
                desc: " in drawing, dining, and bedrooms"
            },
            {
                label: "Marble/anti-skid tiles",
                desc: " in common areas"
            },
            {
                label: "PCC casting",
                desc: " for parking zones"
            },
        ]
    },
    {
        title: "Kitchen",
        list: [
            {
                label: "Marble countertop",
                desc: " for a premium, durable finish"
            },
            {
                label: "Ceramic tile cladding",
                desc: " up to 2 feet above the counter for easy maintenance"
            },
            {
                label: "Stainless steel (S.S.) sink",
                desc: " for longevity and hygiene"
            },
        ]
    },
    {
        title: "Paint",
        list: [
            {
                label: "Interior walls",
                desc: " : Smooth plaster with putty and primer finish"
            },
            {
                label: "Exterior walls",
                desc: " : double coat plaster with weatherproof textured paint."
            },
            {
                label: "Aesthetic facade ",
                desc: ": as per architect’s design for a stylish look."
            },
        ]
    },
    {
        title: "Door and Windows",
        list: [
            {
                label: "Main &amp; internal doors",
                desc: " : Waterproof flush doors with quality accessories"
            },
            {
                label: "Windows",
                desc: " : Anodized aluminum sections fitted with 5 mm quality glass"
            },
            {
                label: "",
                desc: "Designed for durability, insulation, and low maintenance"
            },
        ]
    },
    {
        title: "Electrical",
        list: [
            {
                label: "",
                desc: "AC and geyser provision in master bedroom and bathroom"
            },
            {
                label: "",
                desc: "Separate MCB panel for each unit"
            },
            {
                label: "",
                desc: "Ample lighting in rooms, common areas, and parking"
            },
        ]
    },
    {
        title: "Bathroom",
        list: [
            {
                label: "Ceramic wall tiles",
                desc: " up to door height and anti-skid floor tiles"
            },
            {
                label: "Hindware/Jaquar",
                desc: " or equivalent quality CP fittings"
            },
            {
                label: "",
                desc: "Hot and cold water connections in all attached bathrooms"
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

const gallery = [
    {
        src: '/images/shivashree/shivashree_956x768.avif',
        alt: 'Shivashree Apartment'
    },
    {
        src: '/images/shivashree/floor_plan_1.webp',
        alt: 'Shivashree Apartment'
    },
    {
        src: '/images/shivashree/parking.avif',
        alt: 'Shivashree Apartment'
    },
    {
        src: '/images/shivashree/plan_1.avif',
        alt: 'Shivashree Apartment'
    },
    {
        src: '/images/shivashree/plan_2.avif',
        alt: 'Shivashree Apartment'
    },
    {
        src: '/images/shivashree/plan_3.avif',
        alt: 'Shivashree Apartment'
    },
    {
        src: '/images/shivashree/shivashree_1.avif',
        alt: 'Shivashree Apartment'
    },
    {
        src: '/images/shivashree/shivashree_2.avif',
        alt: 'Shivashree Apartment'
    },
    {
        src: '/images/shivashree/shivashree_3.avif',
        alt: 'Shivashree Apartment'
    },
    {
        src: '/images/shivashree/shivashree_4.avif',
        alt: 'Shivashree Apartment'
    },
];


export const ShivashreeApartment = () => {
    return (
      <Layout 
        title="Sky Link Heights | Sundaram Developers | Smart Homes in Jorhat & Guwahati"
        description="Building modern, sustainable homes in Jorhat and Guwahati. Explore our premium 1BHK, 2BHK, and 3BHK projects."
        image="/images/sky-link-heights-1.avif"
        url="https://sundaramdevelopers.in/sky-link-heights"
        keywords="Sundaram Developers, flats in Assam, Jorhat apartments, smart homes"
      >

        <section class="bg-indigo-600 py-16 px-4">
            <h2 class="text-3xl font-bold text-white text-center kanit-semibold">Welcome to Shivashree Apartment</h2>
            <div class="container mx-auto grid md:grid-cols-2 gap-6 my-8">
                <div class="w-full h-[320px] rounded-lg overflow-hidden shadow-lg">
                    <div class="w-full h-[320px] rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d14265.268822544067!2d92.774339156632!3d26.63832440913618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDM4JzE3LjkiTiA5MsKwNDcnMDQuNyJF!5e0!3m2!1sen!2sin!4v1760427483684!5m2!1sen!2sin"
                            style="border:0;" allowfullscreen={true} loading="lazy" class="w-full h-full"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>

                </div>
                <div class="flex flex-col justify-center gap-6 leading-8 text-white text-lg">
                    <p>
                        Experience modern, sustainable living in <span class="font-semibold italic">Tezpur</span>
                        the scenic city on the north bank of the <span class="font-semibold italic"> Brahmaputrav</span>, well-connected by air, rail, and
                        road.
                        Offering thoughtfully designed <span class="font-semibold italic"> 1BHK, 2BHK, and 3BHK </span>apartments with the latest
                        architectural style, built under expert supervision.
                        A perfect blend of comfort, elegance, and security — a dream home you’ll be proud to own.
                    </p>

                </div>
            </div>
        </section>
          {/* prime location benefits */}
          <section class=" px-4 py-20 text-center bg-zinc-100">
              <h3 class={"mb-8 text-4xl font-semibold"}>Prime Location Benefits</h3>
              <div class={"container mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4"}>
              {locationBenefits
                  .map((item, index) => (
                  <div class="p-4 flex flex-col items-center justify-center gap-2 rounded-md hover:shadow-lg" key={index}>
                      <img src={item.icon} class={"h-12 w-12 mb-2 icon-blue-400"} />
                      {/* {item.icon} */}
                      <label class={"font-semibold text-2xl text-blue-600"}>{item.title}</label>
                      <p class={"text-zinc-700"}>{item.desc}</p>
                  </div>
                  ))
              }
              </div>
          </section>

          {/* features and amenities */}
          <section class="px-4 py-20 bg-white">
              <h3 class={"mb-8 text-4xl font-semibold text-center"}>Features & Amenities</h3>
              <div class={"container mx-auto max-w-7xl w-[80%] grid md:grid-cols-3 gap-4"}>
              {featuresAmenities
                    .map((item, index) => (
                    <div class="p-4 rounded-md hover:shadow-lg" key={index}>
                        <label class={"text-left text-2xl text-blue-600 mb-6"}>{item.title}</label>
                        {item.list
                            .map((subitem, index2) => (
                            <div class="p-2 flex items-center justify-start gap-4 " key={index2}>
                                <img src={subitem.icon} class={"h-6 w-6 icon-yellow-400"} />
                                <p class={"text-zinc-800 text-sm whitespace-nowrap"}>{subitem.feature}</p>
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
              {premiumSpecifications
                    .map((item, index) => (
                    <div class="p-4 rounded-md " key={index}>
                        <label class={"text-left font-medium text-4xl text-zinc-800 "}>{item.title}</label>
                        <ul class={"list-disc list-inside mt-8"}>
                        {item.list
                            .map((subitem, index2) => (
                            <li class={"text-zinc-800 mb-2"}><b class={"pe-2"}>{subitem.label}</b>{subitem.desc}</li>
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