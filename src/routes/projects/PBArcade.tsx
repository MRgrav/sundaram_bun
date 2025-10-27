import { ImageGallery } from "../../components/ImageGallery";
import { Layout } from "../../components/Layout";

const locationBenefits = [
    {
      icon: '/icons/train-fill.svg',
      title: "2 km",
      desc: "Jorhat Town Railway Station",
    },
    {
      icon: '/icons/plane-fill.svg',
      title: "6 km",
      desc: "Jorhat Airport",
    },
    {
      icon: '/icons/bus-2-fill.svg',
      title: "1 km",
      desc: "ISBT Jorhat",
    },
    {
      icon: '/icons/hospital-fill.svg',
      title: "5 km",
      desc: "Jorhat Medical College & 'Hospital'",
    },
    {
      icon: '/icons/graduation-cap-fill.svg',
      title: "6.9 km",
      desc: "Air Force School Jorhat",
    },
    {
      icon: '/icons/shopping-cart-2-fill.svg',
      title: "1.5 km",
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
        title: "Essential Utilities",
        list: [
            {
                label: "24×7 Water Supply",
                desc: " through a deep tube well integrated with a high-efficiency iron removal filtration plant,"
            },
            {
                label: "100% Power Backup ",
                desc: " for lift, common areas, and water supply systems."
            },
            {
                label: "Common Parking Area",
                desc: " at the ground level for shop owners and customers."
            },
        ]
    },
    {
        title: "Interior Finish & Flooring",
        list: [
            {
                label: "",
                desc: "All commercial units feature vitrified tile flooring (2×2) for a sleek, durable finish."
            },
            {
                label: "",
                desc: "Walls finished with POP and primer on the inside; cement paint on the exterior for lasting protection.",
            },
            {
                label: "Staircase and lobby areas ",
                desc: "  feature anti-skid floor tiles for enhanced safety."
            },
        ]
    },
    {
        title: "Sanitary & Comfort",
        list: [
            {
                label: "Individual shop toilets",
                desc: " fitted with superior quality CP fittings and full-height designer tiles."
            },
            {
                label: "Common toilet provision",
                desc: " on each floor for customer and staff convenience."
            },
        ]
    },
    {
        title: "Doors, Windows & Shutters",
        list: [
            {
                label: "Aluminium-framed windows",
                desc: " for weather resistance and longevity."
            },
            {
                label: "Rolling shutters",
                desc: "for all commercial units, ensuring security and ease of access."
            },
        ]
    },
    {
        title: "Electrical & Safety",
        list: [
            {
                label: "",
                desc: "Concealed ISI-marked copper wiring with modular switches."
            },
            {
                label: "",
                desc: "Minimum two power points per unit, with provision for lighting, A/C, and equipment."
            },
            {
                label: "Fire safety norms",
                desc: " compliant construction with designated safety infrastructure."
            },
        ]
    },
    {
        title: "Security & Connectivity",
        list: [
            {
                label: "CCTV surveillance ",
                desc: " covering all floors for enhanced safety."
            },
            {
                label: "Intercom facility",
                desc: " for seamless internal communication."
            },
            {
                label: "Passenger lift",
                desc: "provision for easy vertical mobility across all floors."
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

export const PBArcade = () => {
    return (
      <Layout 
        title="P.B Arcade | Sundaram Developers | Smart Homes in Jorhat & Guwahati"
        description="Building modern, sustainable homes in Jorhat and Guwahati. Explore our premium 1BHK, 2BHK, and 3BHK projects."
        image="/images/sky-link-heights-1.avif"
        url="https://sundaramdevelopers.in/sky-link-heights"
        keywords="Sundaram Developers, flats in Assam, Jorhat apartments, smart homes"
      >

        <section class="bg-amber-600 py-16 px-4">
            <h2 class="text-3xl font-bold text-white text-center kanit-semibold">Welcome to P.B Arcade</h2>
            <div class="container mx-auto grid md:grid-cols-2 gap-6 my-8">
            <div class="w-full h-[320px] rounded-lg overflow-hidden shadow-lg">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3794.4305352067395!2d94.209972!3d26.760419!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3746c3fe625e6147%3A0x5fbdd8d4904833dd!2sP%20B%20Arcade!5e1!3m2!1sen!2sin!4v1760430939156!5m2!1sen!2sin" class="w-full h-full" style="border:0;" allowfullscreen={true} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div class="flex flex-col justify-center gap-6 leading-8 text-white text-lg">
                <p>
                    <span class="font-semibold italic pe-1">'P.B. ARCADE' </span> is a modern commercial project nestled in the bustling heart of Jorhat,
                    near <span class="font-semibold italic">Deepali Medical, AT Road</span>. Designed for modern businesses and retail visionaries, this
                    structured commercial enclave brings together functionality, visibility, and strategic
                    connectivity. With thoughtfully planned shops across multiple floors and essential modern
                    infrastructure, it offers a dynamic business environment complete with power backup, secure
                    access, and shared amenities. Positioned minutes from key transit hubs and healthcare centers,
                    P.B. Arcade is more than just a commercial address — it’s a growth destination built for the
                    entrepreneurs of tomorrow.
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
                      <img src={item.icon} class={"h-12 w-12 mb-2 icon-orange-400"} />
                      {/* {item.icon} */}
                      <label class={"font-semibold text-2xl text-amber-600"}>{item.title}</label>
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
                            <li class={"text-zinc-800 mb-2"}><b class={"pe-1"}>{subitem.label}</b>{subitem.desc}</li>
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