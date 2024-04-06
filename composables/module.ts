import { useLocalStorage } from "@vueuse/core"
import type { ILesson, IModule } from "~/types"

export const useModule = () => {
    const modules = useLocalStorage<IModule[]>('modules', []);
    const currentModuleIndex = useLocalStorage<number>('module-index', 0);
    const module = ref<IModule>({ name: '', slug: '', description: '', lessons: [] });
    const currentEditableModule = useLocalStorage('currentEditableModule', {} as IModule);

    const preparingModules = ref(false);
    const finishedPreparingModules = ref(false);

    const fetchModules = async () => {
        const res = await http.get('/modules');

        return res.data.modules;
    }

    const setEditableModule = (module: IModule) => {
        currentEditableModule.value = module;
    }

    const savingLessons = ref(false);
    const savedLessons = ref(false);

    const persistEditableModuleLessons = async (module: IModule) => {
        savingLessons.value = true;
        savedLessons.value = false;
        await delay(3)

        const res = await http.put(`/module-lessons/${module.slug}`, {
            lessons: module.lessons
        });

        savingLessons.value = false;
        savedLessons.value = true;
    }

    const prepareModules = async (modulesArray: Array<IModule>) => {
        preparingModules.value = true;
        finishedPreparingModules.value = false;

        const formatedModule = modulesArray.map((module, index) => ({
            ...module,
            defaultOpen: index === 0,
        })) as IModule[];

        modules.value = [...formatedModule, ...modules.value];

        await delay(3)
        preparingModules.value = false;
        finishedPreparingModules.value = true
    }

    const getModule = async (slug: string) => {
        const res = await http.get(`/modules/${slug}`);
        module.value = res.data.module as IModule
    }

    const generatingContent = ref(false);
    const generatedContent = ref(false);

    const generateContent = async (index: number, courseName: string) => {
        generatingContent.value = true;
        generatedContent.value = false;

        const module = modules.value[index];

        const { $ai } = useNuxtApp();
        const res = await $ai.generateContent(moduleContentPrompt(index, module.name, courseName));

        const resObject = JSON.parse(res.choices[0].message.content as string);
        module.description = resObject.description
        module.lessons = resObject.lessons

        generatingContent.value = false;
        generatedContent.value = true;
    }

    return {
        module,
        modules,
        getModule,
        fetchModules,
        savedLessons,
        savingLessons,
        prepareModules,
        generateContent,
        preparingModules,
        generatedContent,
        generatingContent,
        setEditableModule,
        currentModuleIndex,
        currentEditableModule,
        finishedPreparingModules,
        persistEditableModuleLessons,
    }

}