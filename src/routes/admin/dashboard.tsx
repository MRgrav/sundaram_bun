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
                <Carousel size='h-[50vh] min-h-[300px]' items={hero} />
            {/* </div> */}
            <div>
                <h2 class={"mt-12 mb-4 text-lg font-bold"}>Contact Messages and Queries</h2>
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
        </AdminLayout>
    );
}