import type { LevelKey } from '~/types';
export const useGenerateContent = () => {

    const { loadingTags, tags, getTags } = useTags();
    const selectedTag = ref(tags.value[0]);
    onMounted(async () => {
        await getTags();
        selectedTag.value = tags.value[0]
    })

    const selectedLevel = ref<LevelKey>('Beginner');

    const {
        generateCourseName,
        isGeneratingCourseName,
        hasGeneratedCourseName
    } = useCourse()

    const generateCourse = () => generateCourseName(selectedTag.value?.name, selectedLevel.value)

    const router = useRouter();

    watchEffect(() => {
        if (hasGeneratedCourseName.value) router.push('/content/preview');
    });

    const isLoading = computed(() => loadingTags.value || isGeneratingCourseName.value)

    return {
        tags,
        isLoading,
        loadingTags,
        selectedTag,
        selectedLevel,
        generateCourse,
        isGeneratingCourseName
    }
}