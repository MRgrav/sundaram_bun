export interface CarouselItem {
    id: string;
    collectionId: string;
    collectionName: string;
    field: string;
    title: string;
    sub: string;
    address: string;
    is_visible: boolean;
    visit_link: string;
    created: string;
    updated: string;
}
  
export interface ProjectItem {
    id: string;
    collectionId: string;
    collectionName: string;
    project_name: string;
    image: string;
    is_completed: boolean;
    project_path: string;
    created: string;
    updated: string;
}
  

// Data Interfaces (defined above for clarity)
export interface ProjectRoute {
    title: string;
    route: string;
}

export interface ProjectSection {
    sectionTitle: string;
    items: ProjectRoute[];
}

export interface ProjectDropdownMenuProps {
    label: string; 
    sections: ProjectSection[]; 
}

export interface AdiHomeProps {
    project?: string;
}


export interface MessageQuery {
    id: string;
    collectionId: string;
    collectionName: string;
    name: string;
    phone: string;
    email: string;
    message_query: string;
    created: string;
    updated: string;
}