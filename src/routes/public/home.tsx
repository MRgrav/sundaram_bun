import { Carousel } from "../../components/shared/Carousel";
import { Layout } from "../../components/layouts/Layout";

import PocketBase from "pocketbase";
import { CarouselItem, ProjectItem } from "../../types/types";
import { ImageCard } from "../../components/ImageCard";
import { boardOfDirectors, homeCountDown, keyFeatures, primeLocationbenefits } from "../../data/home";
import { CountdownCard } from "../../components/shared/CountDownCard";

const pb = new PocketBase(process.env.POCKETBASE_URL);

export const Home = async () => {
  const hero = await pb.collection("carousels").getFullList<CarouselItem>({
    filter: "is_visible = true",
    sort: "-created",
  });

  const projects = await pb.collection("projects").getFullList<ProjectItem>({
    // filter: "is_completed = true",
    sort: "-created",
  });

  const mockSlidesData = [
    {
        title: "Objavte nové obzory",
        description: "Cestovateľské zážitky, ktoré vám zmenia život",
        buttonText: "Rezervovať",
        buttonUrl: "#",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    },
    {
        title: "Prírodné krásy",
        description: "Nádherné výhľady a čistá príroda",
        buttonText: "Pozrieť ponuku",
        buttonUrl: "#",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    },
    {
        title: "Mestské dobrodružstvo",
        description: "Moderné mestá plné života a kultúry",
        buttonText: "Viac informácií",
        buttonUrl: "#",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    }
];

const skyLinkHighlights = [
  'Solar Panels',
  'Smart Lighting System',
  'WiFi-enabled Security Cameras',
  'Gym & Fitness Studio',
  'Multi-purpose Hall',
  'Motion Sensors',
]

  return (
    <Layout 
      title="Sundaram Developers | Smart Homes in Jorhat & Guwahati"
      description="Building modern, sustainable homes in Jorhat and Guwahati. Explore our premium 1BHK, 2BHK, and 3BHK projects."
      image="/images/sky-link-heights-1.avif"
      url="https://sundaramdevelopers.in/"
      keywords="Sundaram Developers, flats in Assam, Jorhat apartments, smart homes"
    >
      
      {/* <HeroSlider slidesData={mockSlidesData}/> */}
      <Carousel items={hero} />

      {/* Signature Projects */}
      <section class="container mx-auto px-4 py-20 text-center">
        <h3 class={"mb-4 text-4xl font-semibold"}>Our Signature Project</h3>
        <div class={"grid md:grid-cols-3 gap-4"}>
        {projects
            .filter(item => item.is_completed != true)
            .map((item, index) => (
              <ImageCard key={item.id || index} item={item} />
            ))
        }
        </div>
      </section>

        {/* completed projects */}
      <section class="container mx-auto px-4 py-20 text-center">
        <h3 class={"mb-4 text-4xl font-semibold"}>Completed Project</h3>
        <div class={"grid md:grid-cols-2 gap-4"}>
        {projects
            .filter(item => item.is_completed == true)
            .map((item, index) => (
              <ImageCard key={item.id || index} item={item} />
            ))
        }
        </div>
      </section>

      {/* prime location benefits */}
      <section class="px-4 py-20 text-center bg-white">
        <h3 class={"container mx-auto mb-8 text-4xl font-semibold"}>Prime Location Benefits</h3>
        <div class={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"}>
        {primeLocationbenefits
            .map((item, index) => (
              <div class="p-4 flex flex-col items-center justify-center gap-2 rounded-md hover:shadow-lg" key={index}>
                <img src={item.icon} class={"h-12 w-12 mb-2 icon-blue-400"} />
                {/* {item.icon} */}
                {/* <label class={"font-semibold text-2xl text-blue-600"}>{item.title}</label> */}
                <p class={"text-zinc-700"}>{item.desc}</p>
              </div>
            ))
        }
        </div>
      </section>

      {/* key features */}
      <section class="container mx-auto px-4 py-20 text-center">
        <h3 class={"mb-8 text-4xl font-semibold"}>Key Features</h3>
        <div class={"grid sm:grid-cols-2 md:grid-cols-4 gap-4"}>
        {keyFeatures
            .map((item, index) => (
              <div class="p-4 flex flex-col items-center justify-center gap-2 rounded-md hover:shadow-lg">
                <img src={item.icon} class={"h-16 w-16 mb-2 icon-blue-500"} />
                {/* {item.icon} */}
                <label class={"font-semibold text-2xl text-zinc-900"}>{item.title}</label>
                <p class={"text-zinc-700"}>{item.desc}</p>
              </div>
            ))
        }
        </div>
      </section>

      {/* sky link banner */}
      <section class="px-4 py-20 text-center bg-white">
        <div class={"container mx-auto flex flex-col md:flex-row justify-center gap-4 lg:gap-12"}>
          <div class={"grow-3 max-w-[600px]"}>
            <img src="/images/sky_link_heights/sdimg_sm.png" class=" min-w-[240px] sm:max-h-[300px] h-full w-full object-cover rounded shadow " />
          </div>
          <div class={"flex flex-col items-start shrink max-w-[600px]"}>
            <h3 class={"text-2xl sm:text-4xl font-bold"}>Sky Link Heights</h3>
            <p class={"text-lg my-2"}>Atila Gaon, Jorhat</p>
            <div class={"flex gap-1.5 flex-wrap mt-4 mb-8"}>
              {skyLinkHighlights.map((item, index) => (
                <span class={"bg-zinc-200 text-zinc-800 px-3 text-sm py-1 rounded-xl hover:shadow"} key={index}>{item}</span>
              ))}
            </div>
            <div>
              <a href="/sky-link-heights" class={"w-fit px-4 py-2 rounded-lg bg-rose-600 text-white font-bold shadow-lg hover:scale-95 hover:shadow-2xl"}>Book Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section class=" px-4 py-20 text-center">
        <h3 class={"mb-8 text-4xl font-semibold"}>About Us</h3>
        <div class={"container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12"}>
        <div style="position:relative;width:100%;overflow:hidden; display:flex; justify-content: center;">
          <video
            src="/video/clip.webm"            
            controls={false}
            autoplay
            muted
            loop
            playsinline
            class="aspect-11/16 md:aspect-square"
            style="width:auto;height:100%;object-fit:cover;display:block;border:0; margin: auto; max-height: 600px;"
          ></video>
        </div>
          <div class={"text-left lg:col-span-2"}>
            <h4 class={"text-2xl font-semibold my-4"}>Welcome to Sundaram Developers</h4>
            <p>Sundaram Developers is a steadily-growing real estate company engaged in construction of several real estate projects across the Upper Assam to meet the growing demand of an emergent India’s Look East Policy. </p>
          </div>
        </div>
      </section>

      {/* board of directors */}
      <section class=" px-4 py-20 text-center bg-white">
        <div class="container mx-auto">
          {boardOfDirectors.map((item, index) => (
            <div class={"flex flex-col justify-between max-w-[900px] mx-auto items-center md:flex-row gap-4 sm:gap-20 mb-14"} key={index}>
              <div>
                <img src={item.profile} alt={item.name} class={"mx-auto min-w-56 min-h-60"} />
              </div>
              <div class={"grow md:text-end"}>
                <h4 class={"font-bold text-2xl mb-4"}>{item.name}</h4>
                <hr />
                <p class={"text-lg sm:whitespace-nowrap"}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Count down */}
      <section class="container mx-auto px-4 py-20 text-center">
        <div class={"grid md:grid-cols-3 gap-1"}>
          {homeCountDown.map((item, index) => (
            <div class={"bg-blue-800"} key={index}>
              <CountdownCard targetNumber={item.number} duration={3000} id={item.label} label={item.label} isPlus={item.isPlus} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );  
}