import { FC } from "hono/jsx";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { Layout } from "../../components/layouts/Layout";
import { Carousel } from "../../components/shared/Carousel";
import { pb } from "../../lib/pocketbase";
import { CarouselItem, MessageQuery } from "../../types/types";

function timeAgo(iso: string) {
    const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
    const now = Date.now();
    const then = new Date(iso).getTime();
    const diff = Math.round((then - now) / 1000); // seconds
    const abs = Math.abs(diff);
    if (abs < 60) return rtf.format(Math.round(diff), 'second');
    if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute');
    if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
    return rtf.format(Math.round(diff / 86400), 'day');
}

type ProjectsProps = {
    path: string;
    label: string;
};
  
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

export const Dashboard = async () => {
    const hero = await pb.collection("carousels").getFullList<CarouselItem>({
        filter: "is_visible = true",
        sort: "-created",
      });

    const mess = await pb.collection('client_contact_requests').getList<MessageQuery>(1, 20, {
        // filter: 'someField1 != someField2',
        sort: '-created'
      });
      
      // resultList.items is newest → oldest
    //   console.log(resultList.items);
      

    return (
        <AdminLayout title="Dashboard">
            {/* <div class={"scale-75"}> */}
                {/* <Carousel size='h-[50vh] min-h-[300px]' items={hero} /> */}
            {/* </div> */}
            <div class={"hidden sm:block"}>
                <h2 class={" mt-12 mb-4 text-lg font-bold"}>Contact Messages and Queries</h2>
                <table class="w-full">
                    <thead>
                        <tr>
                            <th class={"p-1 border border-teal-400 bg-teal-700 text-teal-100"}>#</th>
                            <th class={"p-1 border border-teal-400 bg-teal-700 text-teal-100"}>Name</th>
                            <th class={"p-1 border border-teal-400 bg-teal-700 text-teal-100"}>Email</th>
                            <th class={"p-1 border border-teal-400 bg-teal-700 text-teal-100"}>Phone</th>
                            <th class={"p-1 border border-teal-400 bg-teal-700 text-teal-100"}>Message/Query</th>
                            <th class={"p-1 border border-teal-400 bg-teal-700 text-teal-100"}>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mess && mess.items.map((query, index)=>(
                            <tr>
                                <td class={"border border-teal-400 px-2 py-1 bg-teal-100"}>{index}</td>
                                <td class={"border border-teal-400 px-2 py-1 bg-teal-100"}>{query.name}</td>
                                <td class={"border border-teal-400 px-2 py-1 bg-teal-100"}>{query.email}</td>
                                <td class={"border border-teal-400 px-2 py-1 bg-teal-100"}>{query.phone}</td>
                                <td class={"border border-teal-400 px-2 py-1 bg-teal-100"}>{query.message_query}</td>
                                <td class={"border border-teal-400 px-2 py-1 bg-teal-100"}>{timeAgo(query.created)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div class={"flex justify-between gap-3 mb-8"}>
                <h1>Dashboard</h1>
                <form method="post" action={"/^/logout"}>
                    <button type="submit" class={"px-2 py-0.5 text-sm rounded bg-red-500 text-white shadow"} >Logout</button>
                </form>
            </div>

            <div class={""}>
                <h2 class="text-xl font-semibold text-zinc-700">Projects</h2>
                <div class={"flex flex-col gap-2 "}>
                    {projects && projects.map((item, index) => (
                        <ProjectCard path={item.path} label={item.label} key={index} />
                    ))}
                </div>
            </div>
            <div class={""}>
                <div class={"flex flex-col mt-4"}>
                    <h2 class="text-xl font-semibold text-zinc-700">Queries</h2>
                    {mess && mess.items.map((query, index)=>(
                        <div class={"rounded-lg bg-green-50 border border-green-200 shadow p-4 w-full"}>
                            <div class={"flex justify-between"}>
                                <span class={"text-blue-500 "}>#{index+1}</span>
                                <span class={"text-sm text-zinc-600"}>{timeAgo(query.created)}</span>
                            </div> 
                            <div class={"border border-zinc-400 rounded p-2 my-4 bg-zinc-100"}>
                                <p class={"text-md italic"}>{query.message_query}</p>
                            </div>
                            <div class={"mt-2 text-xs text-right"}>
                                <p class={""}>{query.name}</p>
                                <p class={""}>{query.email}</p>
                                <p class={""}>{query.phone}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}

const ProjectCard: FC<ProjectsProps> = ({path, label}) => {
    return (
        <a href={`/adi/${path}`} class={"bg-sky-200/50 rounded-xl shadow text-blue-500 font-semibold px-4 py-6"}>
            <p>{label}</p>
        </a>
    )
}