import { computed, watch } from 'vue';
import type { ILesson, IModule } from '~/types';

export const useEditorConfig = () => {
    const currentModuleIndex = ref(0);
    const currentLessonIndex = ref(0);

    const isSideBarOpen = ref(false);

    const setCurrentModule = (moduleIndex: number) => {
        currentModuleIndex.value = moduleIndex;
        currentLessonIndex.value = 0;
    };

    const setLessonIndex = (index: number) => {
        currentLessonIndex.value = index;
        isSideBarOpen.value = false;
    }

    const { course } = useCourse()

    const {
        savingLessons,
        persistEditableModuleLessons
    } = useModule();

    const currentEditableModule = computed<IModule>(
        () => course.value.modules[currentModuleIndex.value] as IModule
    );

    // Module Lessons
    const lessons = ref<ILesson[]>((currentEditableModule.value?.lessons ?? []) as ILesson[]);
    const currentLesson = ref<ILesson>({ name: '', content: '' });
    watch(currentEditableModule, (newValue, oldValue) => {
        lessons.value = newValue.lessons as ILesson[]
    });


    onMounted(() => currentLesson.value = lessons.value[currentLessonIndex.value] as ILesson);

    watchEffect(() => currentLesson.value = lessons.value[currentLessonIndex.value]);

    // Construct pageUrl
    const pageURl = ref('');
    watchEffect(() => pageURl.value = `http://localhost:3000/lessons/${currentLesson.value?.slug}`);

    // // Extract Names

    const loadPage = () => {
        const urlParams = new URL(pageURl.value).pathname.split('/');
        const lastParam = urlParams[urlParams.length - 1];

        const lessonIndex = lessons.value.findIndex(lesson => lesson.slug === lastParam);
        if (lessonIndex >= 0) currentLessonIndex.value = lessonIndex;
    }

    const links = computed(() => [
        {
            label: course.value.name,
            icon: 'i-heroicons-home',
            to: `/courses/${course.value.slug}`
        },
        {
            label: currentEditableModule.value.name,
            icon: 'i-heroicons-square-3-stack-3d'
        },
        {
            label: currentLesson.value?.name,
            icon: 'i-heroicons-link',
        }
    ]);

    const { generatingContent, generateLessonContent } = useLesson();
    const generateContent = () => generateLessonContent(course.value.name, currentLesson.value as ILesson)

    function handleKeyDown(event: KeyboardEvent) {
        if (event.ctrlKey || event.metaKey) {
            if (event.key === 's') {
                event.preventDefault();
                persistEditableModuleLessons(currentEditableModule.value);
            }
        }
    }

    onMounted(() => window.addEventListener('keydown', handleKeyDown))
    onBeforeUnmount(() => window.removeEventListener('keydown', handleKeyDown))


    const items = computed(() => course.value.modules.map(
        (md: any, index: number) => [{ label: md.name, index }]
    ));

    return {
        items,
        links,
        pageURl,
        lessons,
        savingLessons,
        isSideBarOpen,
        currentLesson,
        generatingContent,
        currentModuleIndex,
        currentLessonIndex,
        loadPage,
        setLessonIndex,
        generateContent,
        setCurrentModule,
        persistEditableModuleLessons,
    }
}