import type { ContentKey, ICourse, LevelKey } from "~/types";
import { generateCourseNamePrompt, regenerateMetaKeywords } from "~/utils/aiprompts";
import { useLocalStorage } from '@vueuse/core'

export function useCourse() {

    const courses = useLocalStorage<ICourse[]>('courses', []);
    const currentCourseIndex = useLocalStorage<number>('course-index', 0)

    const currentCourse = ref<ICourse>();
    const course = useLocalStorage('content', <ICourse>{
        name: "",
        description: "",
        meta_description: "",
        meta_keywords: [],
        modules: []
    });


    const isGeneratingCourseName = ref(false);
    const hasGeneratedCourseName = ref(false);

    const generateCourseContent = async (technology: string, level: string) => {
        isGeneratingCourseName.value = true;
        hasGeneratedCourseName.value = false;

        const { $ai } = useNuxtApp();
        course.value = await $ai.generateUsingObject(generateCourseContentPrompt(technology, level))

        isGeneratingCourseName.value = false;
        hasGeneratedCourseName.value = true;
    }

    const fetchCourses = async () => {
        courses.value = (await http.get('/courses')).data;
        return courses.value;
    }

    const regenerating = ref(false);
    const regenerated = ref(false);
    const regenerateCourse = async (key: ContentKey) => {

        regenerating.value = true;
        regenerated.value = false;

        const { $ai } = useNuxtApp();
        const res = await $ai.generateContent(contentPrompt(key))

        const generated = JSON.parse(res.choices[0].message.content as string);
        course.value[key] = generated.content;

        regenerating.value = false;
        regenerated.value = true;

    }

    const loading = ref(false);
    const loaded = ref(false)
    const saveCourse = async () => {
        loading.value = true;
        loaded.value = false;

        const response = await http.post('/courses', course.value);
        course.value.name = response.data.course.name;
        course.value.slug = response.data.course.slug;
        course.value.description = response.data.course.description;
        course.value.meta_description = response.data.course.meta_description;
        course.value.meta_keywords = response.data.course.meta_keywords;
        course.value.database_modules = response.data.course.modules;

        loading.value = false;
        loaded.value = true;

    }

    const contentPrompt = (key: ContentKey): string => {
        const courseContentPrompt = {
            name: reqenerateContent(course.value.name),
            description: reqenerateContent(course.value.description),
            meta_description: reqenerateContent(course.value.meta_description),
            meta_keywords: regenerateMetaKeywords(course.value.meta_keywords),
            modules: reqenerateContentArray(course.value.modules as string[]),
        }

        return courseContentPrompt[key]
    }
    return {
        course,
        courses,
        loaded,
        loading,
        saveCourse,
        regenerated,
        regenerating,
        fetchCourses,
        currentCourse,
        regenerateCourse,
        generateCourseContent,
        currentCourseIndex,
        isGeneratingCourseName,
        hasGeneratedCourseName,
    }
}

