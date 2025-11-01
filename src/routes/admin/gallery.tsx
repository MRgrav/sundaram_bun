import { AdminLayout } from "../../components/layouts/AdminLayout"

const projects = [
    {
        label: 'Sky Link Heights',
        path: 'gallery/fsp5ofj8w78q3fr'
    },
    {
        label: 'Shivashree',
        path: 'gallery/lcem835wfncqzqi'
    },
    {
        label: 'Divine Green',
        path: 'gallery/zeqbj5ytxgs54ln'
    },
    {
        label: 'Horo Gauri',
        path: 'gallery/u9686xipuermk4a'
    },
    {
        label: 'P.B Arcade',
        path: 'gallery/gt59b3qczvftjf7'
    }
]

export const ProjectGaellry = () => {
    return (
        <AdminLayout title="Gallery" >
            <h1 class={"text-2xl font-semibold text-zinc-700 mb-8"}>Project Gallery</h1>
            <div class={"container mx-auto grid md:grid-cols-3 gap-4"}>
                {projects.map((item)=>(
                    <a href={item.path} class={"rounded font-semibold text-lg bg-sky-100 p-6 border-sky-500 shadow"}>
                        {item.label}
                    </a>
                ))}
            </div>
        </AdminLayout>
    )
}