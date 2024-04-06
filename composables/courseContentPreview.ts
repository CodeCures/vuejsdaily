import type { ContentKey, IModule } from "~/types";

export const useCourseContentPreview = () => {
    const {
        course,
        loading,
        loaded,
        saveCourse,
        regenerating,
        regenerated,
        regenerateCourse
    } = useCourse();

    const metaKeywords = computed(() => course.value.meta_keywords?.join(','));
    const keywordsString = ref(metaKeywords.value);
    watchEffect(() => {
        if (keywordsString.value) {
            course.value.meta_keywords = keywordsString.value.split(',')
        }
    });

    const modules = computed(() => course.value.modules?.join("\n"))
    const modulesString = ref(modules.value)
    watchEffect(() => {
        if (modules.value) {
            course.value.modules = modulesString.value.split('\n')
        }
    });

    const loadingField = ref();
    const regenerate = async (feild: ContentKey) => {
        loadingField.value = feild;
        await regenerateCourse(feild);
    };

    const isRegenerating = (field: string) => regenerating.value && loadingField.value === field;
    watchEffect(() => regenerated.value && (loadingField.value = null))

    // preparing course modules for the modules array
    const {
        prepareModules,
        preparingModules,
        finishedPreparingModules
    } = useModule();

    const router = useRouter();

    watchEffect(() => loaded.value && prepareModules(course.value.database_modules as IModule[]))
    watchEffect(() => finishedPreparingModules.value && router.push(`/content/courses/${course.value.slug}/modules`))

    return {
        course,
        loading,
        saveCourse,
        regenerate,
        isRegenerating,
        preparingModules
    }
}