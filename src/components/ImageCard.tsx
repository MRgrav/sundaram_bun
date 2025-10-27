import { FC } from "hono/jsx";
import { ProjectItem } from "../types/types";

interface ImageCardProps {
    item: ProjectItem;
  }
  

export const ImageCard: FC<ImageCardProps> = ({ item }) => {
    return (
        <a
            class="relative w-full overflow-hidden shadow-md group block"
            href={item.project_path}
        >
            <div class="relative w-full bg-zinc-100">
                <img
                    // ✅ FIX 1 & 2: Use JSX curly braces {} to inject variable values for src, alt, and title.
                    // ✅ FIX 3: Convert inline CSS string to a JavaScript object for TSX.
                    // Added group-hover utility class for a modern effect.
                    class="w-full h-full object-cover transition-transform duration-400 ease-[cubic-bezier(.29,.93,.47,.98)] aspect-video group-hover:scale-[1.03]"
                    style={{
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                    }}
                    src={`https://baas.sundaramdevelopers.in/api/files/${item.collectionId}/${item.id}/${item.image}`} // Variable 'image'
                    alt={item.project_name}    // Variable 'alt'
                    title={item.project_name} // Variable 'title'
                    loading="lazy"
                />
                <div class="absolute bottom-0 left-0 right-0 p-3 bg-black/60 text-center transition-colors">
                    {/* ✅ FIX 4: Output variable directly using {} instead of liquid-style {{ title }} */}
                    <h3 class="text-white text-lg font-semibold">{item.project_name}</h3>
                </div>
            </div>
        </a>
    );
}