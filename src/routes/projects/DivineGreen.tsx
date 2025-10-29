import { ImageGallery } from "../../components/ImageGallery";
import { Layout } from "../../components/layouts/Layout";

const locationBenefits = [
    {
      icon: '/icons/train-fill.svg',
      title: "1 km",
      desc: "Jorhat Town Railway Station",
    },
    {
      icon: '/icons/plane-fill.svg',
      title: "5 km",
      desc: "Jorhat Airport",
    },
    {
      icon: '/icons/bus-2-fill.svg',
      title: "2.8 km",
      desc: "ISBT Jorhat",
    },
    {
      icon: '/icons/hospital-fill.svg',
      title: "2.2 km",
      desc: "Jorhat Medical College & 'Hospital'",
    },
    {
      icon: '/icons/graduation-cap-fill.svg',
      title: "5.8 km",
      desc: "Air Force School Jorhat",
    },
    {
      icon: '/icons/shopping-cart-2-fill.svg',
      title: "1.7 km",
      desc: "Vishal Mega Mart",
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
          label: "Bedrooms, Living & Dining",
          desc: "Premium vitrified tiles in all units."
        },
        {
          label: "Balcony & Sit-Out",
          desc: "Durable, easy to maintain, and stain-resistant surface."
        },
        {
          label: "Toilet Floors",
          desc: "Adds a modern and elegant look to all living spaces."
        },
      ]
    },
    {
      title: "Kitchen",
      list: [
        {
          label: "Elegant Tiles",
          desc: "Durable granite countertop for a sleek, easy-to-clean workspace."
        },
        {
          label: "Durable Sink",
          desc: "High-quality stainless steel (S.S.) sink for long-lasting use."
        },
        {
          label: "Premium Faucet",
          desc: "Thoughtfully designed for functionality and modern living."
        },
      ]
    },
    {
      title: "Paint",
      list: [
        {
          label: "Internal Putty",
          desc: "Interior walls: smooth plaster with two coats of putty and primer."
        },
        {
          label: "Interior Emulsion",
          desc: "Exterior walls: double coat plaster with weatherproof textured paint."
        },
        {
          label: "Exterior Emulsion",
          desc: "Facade finished as per architect’s design for a stylish look."
        },
      ]
    },
    {
      title: "Door and Windows",
      list: [
        {
          label: "Main Door",
          desc: "Main doors: laminated, 3’6″ wide with wooden frames and safety locks."
        },
        {
          label: "Internal Doors",
          desc: "Bedroom doors: laminated flush doors, 3′ wide with wooden frames."
        },
        {
          label: "Toilet Doors",
          desc: "Aluminum-framed windows for durability and low maintenance."
        },
      ]
    },
    {
      title: "Electrical",
      list: [
        {
          label: "Distribution Board",
          desc: "Concealed premium-quality ISI-marked wiring for safety and durability."
        },
        {
          label: "MCBs",
          desc: "Branded modular switches for modern aesthetics and reliability."
        },
        {
          label: "Switches",
          desc: "Individual MCB panel for each unit ensuring electrical safety and easy maintenance."
        },
      ]
    },
    {
      title: "Bathroom",
      list: [
        {
          label: "EWC",
          desc: "Premium sanitary ware and C.P. fittings for quality and style."
        },
        {
          label: "Wash Basin",
          desc: "Designer floor tiles and wall tiles installed up to door height."
        },
        {
          label: "Wall Plate",
          desc: "Stylish, durable, and easy-to-clean finishes."
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
    },{
      title: "Flooring",
      desc: "All rooms will have vitrified tiles."
    },{
      title: "Kitchen",
      desc: "Granite finish conter top."
    },{
      title: "Toilets",
      desc: "Superior Quality CP fittings with tiles on wall upto door height and floor."
    },{
      title: "Doors",
      desc: "Wooden frame & readymade flash door. Window Allumininum frames."
    },{
      title: "Water",
      desc: "24 hrs running water."
    },{
      title: "Interior walls",
      desc: "Inside wall finish with POP."
    },{
      title: "Exterior wall",
      desc: "115mm peripheral wall "
    },{
      title: "Fire safety",
      desc: "Equipped with fire alarm/fighting devices extinguishers fire water reservior."
    },{
      title: "Electrical fitting",
      desc: "Concealed copper wiring (ISI marked) with modular switches."
    },{
      title: "Lift",
      desc: "6 passanger lift."
    },
];

const gallery = [
    {
        src: '/images/divine_green/divine-green-640x480.avif',
        alt: 'Divine Green'
    },
    {
        src: '/images/divine_green/divine-green-3.avif',
        alt: 'Divine Green'
    },
    {
        src: '/images/divine_green/SitePlan.avif',
        alt: 'Divine Green'
    },
    {
        src: '/images/divine_green/FloorPlan.avif',
        alt: 'Divine Green'
    },
]

export const DivineGreen = () => {
    return (
      <Layout 
        title="Divine Green | Sundaram Developers | Smart Homes in Jorhat & Guwahati"
        description="Building modern, sustainable homes in Jorhat and Guwahati. Explore our premium 1BHK, 2BHK, and 3BHK projects."
        image="/images/sky-link-heights-1.avif"
        url="https://sundaramdevelopers.in/sky-link-heights"
        keywords="Sundaram Developers, flats in Assam, Jorhat apartments, smart homes"
      >

        <section class="bg-teal-600 py-16 px-4">
            <h2 class="text-3xl font-bold text-white text-center kanit-semibold">Welcome to Divine Green</h2>
            <div class="container mx-auto grid md:grid-cols-2 gap-6 my-8">
            <div class="w-full h-[320px] rounded-lg overflow-hidden shadow-lg">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.7676223683775!2d91.72310484578604!3d26.106503218366043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5d57ce4e1d6b%3A0x3448edcd871820a3!2sDivine%20Green%20Apartment!5e0!3m2!1sen!2sin!4v1760332643867!5m2!1sen!2sin" class="w-full h-full" style="border:0;" allowfullscreen={true} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div class="flex flex-col justify-center gap-6 leading-8 text-white text-lg">
                <p>The name <span class="font-semibold italic">'Divine Green'</span> signifies priority and flawlessness, rightfully signifying the commitment that the Divine Developers has to ensure a modern habitat for Guwahati.</p>
                <p>Divine Green was conceived with the idea of creating a home that was perfect in all respects. What you need is compact living space, where room sizes are spacious and where life can be comfortable and convenient. The project is located in the fast-developing residential hub of Guwahati, making it a sought-after place to reside.</p>
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
                      <img src={item.icon} class={"h-12 w-12 mb-2 icon-teal-600"} />
                      {/* {item.icon} */}
                      <label class={"font-semibold text-2xl text-teal-600"}>{item.title}</label>
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
                        <label class={"text-left text-2xl text-teal-600 mb-6"}>{item.title}</label>
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
                            <li class={"text-zinc-800 mb-2"}>{subitem.desc}</li>
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