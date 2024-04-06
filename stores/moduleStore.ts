import type { IModule } from "~/types";

export const useModuleStore = defineStore('modules', {
    state: () => {
        return {
            modules: [] as IModule[],
            module: null as IModule | null,
            moduleIndex: 0
        }
    },
    actions: {
        async getModules() {
            const { fetchModules } = useModule();

            this.modules = await fetchModules();
        },
        getModule(slug: string) {
            // this.module = this.modules.find(module => module.slug === slug) as IModule;
            this.moduleIndex = this.modules.findIndex(module => module.slug === slug)
        },
    },
    persist: true,
})