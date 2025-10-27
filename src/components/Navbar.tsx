import { ProjectSection } from "../types/types";
import { DropdownMenu } from "./DropDownMenu";

// Define your project data using the new structure
const projectData: ProjectSection[] = [
  {
      sectionTitle: "Completed Projects",
      items: [
          { title: "Horo Gauri", route: "/horo-gauri" },
          { title: "P.B Arcade", route: "/pb-arcade" },
      ],
  },
  {
      sectionTitle: "Under Construction",
      items: [
          { title: "Divine Green", route: "/divine-green" },
          { title: "Sky Link Heights", route: "/sky-link-heights" },
          { title: "Shivashree Apartments", route: "/shivashree" },
      ],
  },
];

export const Navbar = () => (
    <nav class="bg-white shadow-md " id="header-top">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" class="flex items-center justify-center gap-1 font-bold text-blue-800 text-xl sm:text-2xl">
          <img src="logo.png" class="w-12 h-12" />
          <span>Sundaram Developers</span>
        </a>
        <div class="hidden md:flex space-x-3 items-center">
          <DropdownMenu label="Projects" sections={projectData} />
          <a href="/" class="hover:text-blue-800 px-4 py-2">Home</a>
          <a href="/about" class="hover:text-blue-800 px-4 py-2">About</a>
          <a href="/contact" class="hover:text-blue-800 px-4 py-2">Contact</a>
        </div>
        <div class={"flex md:hidden"}>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
          </button>
        </div>
      </div>
    </nav>
  );
  