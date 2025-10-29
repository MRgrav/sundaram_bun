import { AdminLayout } from "../../components/layouts/AdminLayout";
import { Home } from "../public/home";
import { DivineGreen } from "../projects/DivineGreen";
import { HoroGauriComplex } from "../projects/HoroGauriComplex";
import { PBArcade } from "../projects/PBArcade";
import { ShivashreeApartment } from "../projects/ShivashreeApartment";
import { SkyLinkHeights } from "../projects/SkyLinkHeights";

export const AdiProject = (props: { project?: string }) => {
    const { project } = props;

    return (
        <AdminLayout title="Home">
            {project === 'home' && <Home />}
            {project === 'sky-link-heights' && <SkyLinkHeights />}
            {project === 'divine-green' && <DivineGreen />}
            {project === 'shivashree' && <ShivashreeApartment />}
            {project === 'horo-gauri' && <HoroGauriComplex />}
            {project === 'pb-arcade' && <PBArcade />}
        </AdminLayout>
    );
}
