const projects = [
    {
        label: 'Sky Link Heights',
        path: 'page/fsp5ofj8w78q3fr'
    },
    {
        label: 'Shivashree',
        path: 'page/lcem835wfncqzqi'
    },
    {
        label: 'Divine Green',
        path: 'page/zeqbj5ytxgs54ln'
    },
    {
        label: 'Horo Gauri',
        path: 'page/u9686xipuermk4a'
    },
    {
        label: 'P.B Arcade',
        path: 'page/gt59b3qczvftjf7'
    }
]

export const AdminLayout = ({
    title,
    description,
    image,
    url,
    keywords,
    children
  }: {
    title: string
    description?: string
    image?: string
    url?: string
    keywords?: string
    children: any
  }) => (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
        {/* --- Basic  --- */}
        <title>{title}</title>

        {/* --- Resource Hints (Preload/Caching) --- */}
        <link rel="preload" as="style" href="/output.css" />
        <link rel="stylesheet" href="/output.css" />
        <link rel="preload" as="image" href="/images/hero.webp" type="image/webp" />
        <script src="/js/htmx.min.js"></script>
  
        {/* --- Favicon --- */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </head>
        <body class="bg-linear-to-b from-green-100 to-zinc-200 text-zinc-800 antialiased max-h-screen">
            <div class={"flex h-full overflow-hidden"}>
                <div class={"min-w-fit p-6"}>
                    <h1 class={"flex gap-2 text-green-800 text-xl items-center font-semibold mb-8"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 14V16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM14.5946 18.8115C14.5327 18.5511 14.5 18.2794 14.5 18C14.5 17.7207 14.5327 17.449 14.5945 17.1886L13.6029 16.6161L14.6029 14.884L15.5952 15.4569C15.9883 15.0851 16.4676 14.8034 17 14.6449V13.5H19V14.6449C19.5324 14.8034 20.0116 15.0851 20.4047 15.4569L21.3971 14.8839L22.3972 16.616L21.4055 17.1885C21.4673 17.449 21.5 17.7207 21.5 18C21.5 18.2793 21.4673 18.551 21.4055 18.8114L22.3972 19.3839L21.3972 21.116L20.4048 20.543C20.0117 20.9149 19.5325 21.1966 19.0001 21.355V22.5H17.0001V21.3551C16.4677 21.1967 15.9884 20.915 15.5953 20.5431L14.603 21.1161L13.6029 19.384L14.5946 18.8115ZM18 19.5C18.8284 19.5 19.5 18.8284 19.5 18C19.5 17.1716 18.8284 16.5 18 16.5C17.1716 16.5 16.5 17.1716 16.5 18C16.5 18.8284 17.1716 19.5 18 19.5Z"></path></svg>
                        <span>Sundaram</span>
                    </h1>
                    <p class={"mt-14 mb-2 font-semibold text-sm"}>My Panel</p>
                    <div class={"flex flex-col gap-2 h-full "}>
                        <div class={"px-4 py-1 rounded-lg hover:bg-white hover:shadow"}>
                            <a href={"/adi/dashboard"} class={"flex items-center gap-2 p-2 text-green-900"}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path></svg>
                                <span>Dashboard</span>
                            </a>
                        </div>
                        {/* <p class="mt-4 border-b border-teal-500 text-teal-500 text-sm uppercase tracking-widest">Projects</p> */}
                        <p class={"mt-10 mb-2  border-b font-semibold text-sm"}>projects</p>
                        {projects.map((item, index) => (
                        <div class={"px-2 rounded-lg hover:bg-white hover:shadow"} key={index}>
                            <a href={`/adi/${item.path}`} class={"flex items-center gap-2 p-2 text-green-900"}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 2C20.5523 2 21 2.44772 21 3V8C21 8.55228 20.5523 9 20 9H15V22C15 22.5523 14.5523 23 14 23H10C9.44772 23 9 22.5523 9 22V9H3.5C2.94772 9 2.5 8.55228 2.5 8V5.61803C2.5 5.23926 2.714 4.893 3.05279 4.72361L8.5 2H20ZM15 4H8.97214L4.5 6.23607V7H11V21H13V7H15V4ZM19 4H17V7H19V4Z"></path></svg>
                                <span>{item.label}</span>
                            </a>
                        </div>
                        ))}
                        
                        <p class={"mt-10 mb-2  border-b font-semibold text-sm"}>support</p>
                        <div class={"text-sm tracking-wide text-zinc-700"}>
                            <p>info@deolang.com</p>
                            <p>cto@deolang.com</p>
                        </div>
                    </div>
                </div>
                <div class={"grow p-4 overflow-auto"}>
                    <div class={"w-full max-h-[90vh] min-w-[80vh] overflow-scroll rounded-2xl shadow-lg bg-white"}>
                        {/* <div class={"flex gap-2 border-b"}>
                            <button class={"px-3 py-1 cursor-pointer "}>Page Settings</button>
                            <button class={"px-3 py-1 cursor-pointer flex items-center gap-2 text-zinc-600"}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>
                                <span>preview</span>
                            </button>
                        </div> */}
                        <div class={"p-4"}>
                            {children}
                        </div>
                    </div>
                    <footer class="text-center text-zinc-800 py-6">
                        <p>© {new Date().getFullYear()} Sundaram Developers. All rights reserved.</p>
                    </footer>
                </div>
                {/* <div class={"grow max-w-[200px] py-4 pe-4 overflow-auto"}>
                    <div class={"flex flex-col gap-3 p-2 min-h-[60vh] bg-zinc-800 text-zinc-300"}>
                        <h2>Image Picker</h2>
                        <div class={"relative hover:scale-95"}>
                            <img src="/logo.png" width={160} height={160} class={"border rounded-sm hover:shadow-2xl w-full h-auto aspect-auto"} />
                            <span class={"absolute -mt-8 ms-1 bg-black p-1 border"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M7 4V2H17V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H7ZM7 6H5V20H19V6H17V8H7V6ZM9 4V6H15V4H9Z"></path></svg>
                            </span>
                        </div>
                    </div>
                </div> */}
            </div>
      </body>
    </html>
  );
  