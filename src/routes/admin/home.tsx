import { AdminLayout } from "../../components/layouts/AdminLayout";
import { Carousel } from "../../components/shared/Carousel";
import { pb } from "../../lib/pocketbase";
import { CarouselItem } from "../../types/types";
import { Home } from "../public/home";

export const AdiHome = async () => {
    const hero = await pb.collection("carousels").getFullList<CarouselItem>({
        filter: "is_visible = true",
        sort: "-created",
      });

    return (
        <AdminLayout title="Home">
            <Carousel items={hero} />
        </AdminLayout>
    );
}