import { html } from 'hono/html';
import type { FC } from 'hono/jsx';
// Assuming the types are correctly defined here:
// interface ProjectRoute { title: string; route: string; }
// interface ProjectSection { sectionTitle: string; items: ProjectRoute[]; }
// interface ProjectDropdownMenuProps { label: string; sections: ProjectSection[]; }
// If you cannot import types, you can define them inline or assume global availability
// For this example, I'll assume they are available via the provided import.
import { ProjectDropdownMenuProps } from '../types/types'; 


export const DropdownMenu: FC<ProjectDropdownMenuProps> = ({ label, sections }) => {

    if (!sections || sections.length === 0) {
        return (<div class="text-zinc-500 py-2 px-4">{label} (No Sections)</div>);
    }
    
    // Use a unique ID for the component instance
    const componentId = `dd-${Math.random().toString(36).substring(2, 9)}`;
    const contentWidth = sections.length > 1 ? 'w-auto min-w-[30rem]' : 'w-56';

    return (
        // 1. Base container: relative, given a unique ID, and includes 'group' for general styling
        // The custom class 'js-dropdown-container' is used by the script for targeting.
        <div id={componentId} class="relative inline-block text-left js-dropdown-container group">
            
            {/* 2. Dropdown Trigger/Label (button is also used by the script) */}
            <button
                type="button"
                id={`button-${componentId}`}
                class="inline-flex justify-center items-center w-full rounded-md px-4 py-2 hover:text-blue-800 outline-none"
                aria-expanded="false"
                aria-haspopup="true"
            >
                {label}
                {/* Chevron icon, now its rotation is controlled by the JS adding the 'is-open' class */}
                <svg id={`chevron-${componentId}`} class="-mr-1 ml-2 h-5 w-5 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd" />
                </svg>
            </button>

            {/* 3. Dropdown Content */}
            <div 
                id={`content-${componentId}`}
                // Classes define the transition, but the 'is-open' class (added by JS) toggles scale/opacity
                class={`absolute right-0 mt-2 ${contentWidth} origin-top-left rounded-md shadow-2xl bg-white/90 ring-1 ring-black ring-opacity-5 focus:outline-none p-4 
                       transition-all duration-300 delay-100 ease-out transform scale-95 opacity-0 pointer-events-none z-50 backdrop-blur-md`}
                role="menu" 
                aria-orientation="vertical" 
                aria-labelledby="menu-button"
            >
                <div 
                    class={`flex ${sections.length > 1 ? 'space-x-8' : 'flex-col'}`}
                    role="none"
                >
                    {sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} class="flex-1 min-w-48">
                            <h3 class="text-base font-bold text-zinc-800 border-b border-zinc-300 pb-1 mb-2">
                                {section.sectionTitle}
                            </h3>
                            
                            <ul class="space-y-1">
                                {section.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <a
                                            href={item.route}
                                            class="text-zinc-700 block p-1 hover:bg-zinc-100 hover:text-blue-600 transition-colors rounded"
                                            // Add data attribute for potential future click tracking/closing
                                            data-is-link="true"
                                        >
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Client-side JavaScript for Click Toggle and Close-on-Outside-Click */}
            {html`
                <style>
                    /* Define the state classes for open/closed */
                    .is-open #content-${componentId} {
                        opacity: 1;
                        transform: scale(1);
                        pointer-events: auto;
                    }
                    .is-open #chevron-${componentId} {
                        transform: rotate(180deg);
                    }
                </style>
                <script>
                    (function() {
                        const container = document.getElementById('${componentId}');
                        const button = document.getElementById('button-${componentId}');
                        
                        if (!container || !button) return;

                        // Function to open/close the dropdown
                        const toggleDropdown = (open) => {
                            if (open !== undefined) {
                                container.classList.toggle('is-open', open);
                            } else {
                                container.classList.toggle('is-open');
                            }
                            // Update ARIA attribute
                            const isCurrentlyOpen = container.classList.contains('is-open');
                            button.setAttribute('aria-expanded', isCurrentlyOpen.toString());
                        };

                        // 1. Toggle on button click
                        button.addEventListener('click', (event) => {
                            event.stopPropagation(); // Prevents click from immediately triggering the global close listener
                            toggleDropdown();
                        });

                        // 2. Close on outside click
                        document.addEventListener('click', (event) => {
                            const target = event.target;
                            // Check if the click is outside this specific dropdown container
                            if (container.classList.contains('is-open') && !container.contains(target)) {
                                toggleDropdown(false);
                            }
                        });
                        
                        // 3. Close when a link inside is clicked (optional, but good UX)
                        container.querySelectorAll('[data-is-link="true"]').forEach(link => {
                           link.addEventListener('click', () => {
                               toggleDropdown(false);
                           });
                        });
                    })();
                </script>
            `}
        </div>
    );
};