import type { IModule } from "~/types"
export const useCourseModule = () => {

    const { course } = useCourse()
    const { modules, generateContent, generatedContent, generatingContent } = useModule();

    const route = useRoute();
    const courseModules = computed(() => modules.value.filter(m => m.course_slug === route.params.slug))
    const hasEmptyModule = computed(() => courseModules.value.some(m => !m.description && m.lessons.length === 0))

    const hasContent = (module: IModule) => module.description && (module.lessons.length > 0);

    const processingindex = ref();
    const generateModuleContent = (index: number) => {
        processingindex.value = index;
        generateContent(index, course.value.name);
    };
    const isGeneratingContent = (index: number) => (processingindex.value === index) && generatingContent.value;
    watchEffect(() => generatedContent.value && (processingindex.value = null));

    const onUpdateLessons = (event: { input: string, index: number }) => {
        courseModules.value[event.index].lessons = event.input.split('\n');
    }

    const router = useRouter();
    const creatingLessons = ref(false);
    const onCompleteModule = async () => {
        creatingLessons.value = true;

        await http.post('/modules-lessons', { modules: courseModules.value });
        creatingLessons.value = false;

        router.push('/modules')
    }

    return {
        hasContent,
        courseModules,
        hasEmptyModule,
        creatingLessons,
        onUpdateLessons,
        onCompleteModule,
        isGeneratingContent,
        generateModuleContent,
    }
}