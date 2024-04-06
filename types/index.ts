export interface ICourse {
    name: string;
    slug?: string;
    description: string;
    meta_keywords: string[];
    meta_description: string;
    image?: string;
    modules: IModule[] | string[],
    database_modules?: IModule[];
}

export interface ITag {
    id: number;
    name: string;
}

export type ContentKey = "name" | "description" | "meta_keywords" | "meta_description" | "modules";
export type LevelKey = "Beginner" | "Intermediate" | "Advanced";

export interface ILesson {
    name: string;
    slug?: string;
    content?: string | null;
}

export interface IModule {
    course_slug?: string;
    name: string;
    slug?: string;
    description?: string;
    lessons: ILesson[] | string[]
}