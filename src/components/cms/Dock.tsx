import { FC } from "hono/jsx";

type DockItemProps = {
    path: string;
    label: string;
};

export const Dock = () => {
    return (
        <a
            href="/adi/dashboard"
            className="block sm:hidden fixed bottom-6 right-4 z-50"
            aria-label="Go to dashboard"
        >
            <div className="w-14 h-14 bg-teal-600 text-white shadow-lg rounded-full flex items-center justify-center transition-transform transform hover:scale-105 active:scale-95">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19ZM7 15H17V17H7V15Z" />
                </svg>
            </div>
        </a>

        // <div class={"block sm:hidden absolute bottom-0 z-9999 w-full bg-transparent"}>
        //     <div class={"bg-teal-600 text-white shadow rounded-2xl mb-4 w-10 h-10 flex justify-center items-center"}>
        //         <a href="/adi/dashboard" class={"w-full h-full flex justify-center items-center"}>
        //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19ZM7 15H17V17H7V15Z"></path></svg>
        //         </a>
        //     </div>
        //     {/* <div class={"grid grid-cols-2 gap-1"}>
        //         <DockItem path={"/adi/dashboard"} label={"Dashboard"} />
        //         <DockItem path={"/adi/projects"} label={"Projects"} />
        //     </div> */}
        // </div>
    );
}

const DockItem: FC<DockItemProps> = ({ path, label }) => {
    return (
        <a href={path} class={"w-full text-center font-semibold py-2 px-3 bg-green-700/40 backdrop-blur-xs hover:focus:bg-green-700/60"}>
            <span>{label}</span>
        </a>
    );
}