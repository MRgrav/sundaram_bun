import { html } from "hono/html";
import type { FC } from "hono/jsx";
import { ProjectSection } from "../../types/types";
import { DropdownMenu } from "./DropDownMenu"; // Assuming this is your click-based component

// Define your project data using the new structure (moved into component or file)
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

export const Navbar: FC = () => {
    
    // Unique ID for the mobile menu elements
    const mobileMenuId = 'mobile-menu-container';
    const menuButtonId = 'mobile-menu-button';

    return (
        <nav class="bg-white shadow-md sticky top-0 z-40" id="header-top">
            <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                
                {/* Logo and App Name */}
                <a href="/" class="flex items-center justify-center gap-1 font-bold text-blue-800 text-xl sm:text-2xl z-40">
                    {/* NOTE: Ensure 'logo.png' is accessible in your 'public' directory */}
                    <img src="logo.png" class="w-12 h-12" alt="Sundaram Developers Logo" />
                    <span>Sundaram Developers</span>
                </a>
                
                {/* Desktop Menu */}
                <div class="hidden md:flex space-x-3 items-center">
                    <a href="/" class="hover:text-blue-800 px-4 py-2">Home</a>
                    <a href="/about" class="hover:text-blue-800 px-4 py-2">About</a>
                    <DropdownMenu label="Projects" sections={projectData} /> 
                    <a href="/contact" class="hover:text-blue-800 px-4 py-2">Contact</a>
                </div>
                
                {/* Mobile Menu Button (Hamburger/Close) */}
                <div class="flex md:hidden z-50">
                    <button id={menuButtonId} aria-label="Toggle mobile menu" aria-expanded="false">
                        {/* Hamburger Icon (will swap with X via JS/CSS) */}
                        <svg id="hamburger-icon" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
                        
                        {/* Close Icon (Hidden by default) */}
                        <svg id="close-icon" class="h-6 w-6 hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </div>

            {/* --- Mobile Menu Container (Initially Hidden) --- */}
            <div 
                id={mobileMenuId}
                class="fixed top-0 left-0 w-full h-full bg-white/95 backdrop-blur-md transform -translate-x-full transition-transform duration-300 ease-in-out md:hidden z-40"
            >
                <div class="flex flex-col items-center pt-24 space-y-6">
                    {/* Mobile Menu Links */}
                    <a href="/" class="text-2xl font-semibold text-gray-800 hover:text-blue-800" data-menu-link>Home</a>
                    <a href="/about" class="text-2xl font-semibold text-gray-800 hover:text-blue-800" data-menu-link>About</a>
                    <a href="/contact" class="text-2xl font-semibold text-gray-800 hover:text-blue-800" data-menu-link>Contact</a>
                    
                    {/* The Dropdown Menu for Projects (Rendered flat for mobile simplicity or integrated dropdown) */}
                    <div class="w-full max-w-xs px-4">
                        <h3 class="text-xl font-bold text-gray-800 mt-4 mb-2 border-t pt-4">Projects</h3>
                        {projectData.map((section) => (
                            <div key={section.sectionTitle} class="mb-3">
                                <h4 class="font-semibold text-gray-600 mb-1">{section.sectionTitle}</h4>
                                <ul class="pl-4 space-y-1">
                                    {section.items.map((item) => (
                                        <li key={item.route}>
                                            <a href={item.route} class="text-lg text-gray-500 hover:text-blue-600 block" data-menu-link>
                                                {item.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* --- Client-Side Script to Toggle Mobile Menu --- */}
            {html`
                <script>
                    (function() {
                        const menuButton = document.getElementById('${menuButtonId}');
                        const menuContainer = document.getElementById('${mobileMenuId}');
                        const hamburgerIcon = document.getElementById('hamburger-icon');
                        const closeIcon = document.getElementById('close-icon');

                        if (!menuButton || !menuContainer) return;

                        const toggleMenu = (open) => {
                            const isOpen = open !== undefined ? open : menuContainer.classList.contains('translate-x-0');
                            
                            if (isOpen) {
                                // Close the menu
                                menuContainer.classList.add('-translate-x-full');
                                menuContainer.classList.remove('translate-x-0');
                                hamburgerIcon.classList.remove('hidden');
                                closeIcon.classList.add('hidden');
                                document.body.style.overflow = 'auto';
                                menuButton.setAttribute('aria-expanded', 'false');
                            } else {
                                // Open the menu
                                menuContainer.classList.remove('-translate-x-full');
                                menuContainer.classList.add('translate-x-0');
                                hamburgerIcon.classList.add('hidden');
                                closeIcon.classList.remove('hidden');
                                document.body.style.overflow = 'hidden'; // Prevent background scrolling
                                menuButton.setAttribute('aria-expanded', 'true');
                            }
                        };

                        // 1. Toggle on button click
                        menuButton.addEventListener('click', () => toggleMenu());
                        
                        // 2. Close when any link inside the menu is clicked (good UX)
                        menuContainer.querySelectorAll('[data-menu-link]').forEach(link => {
                           link.addEventListener('click', () => {
                               toggleMenu(true); // Explicitly close
                           });
                        });
                    })();
                </script>
            `}
        </nav>
    );
};