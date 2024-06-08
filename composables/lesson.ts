import type { ILesson } from "~/types";
import { generateLessonContentPrompt } from "~/utils/aiprompts";
import { useLocalStorage } from "@vueuse/core"
export const useLesson = () => {
    const generatingContent = ref(false);
    const generatedContent = ref(false);
    const selectedLessonIndex = useLocalStorage('lesson-index', 0);

    const generateLessonContent = async (courseName: string, lesson: ILesson) => {
        generatingContent.value = true;
        generatedContent.value = false;

        const { $ai } = useNuxtApp();
        const res = await $ai.generateUsingObject(generateLessonContentPrompt(courseName, lesson.name), false)
        console.log(res);

        lesson.content = res;

        generatingContent.value = false;
        generatedContent.value = true;
    }


    return {
        generatedContent,
        generatingContent,
        generateLessonContent,
        selectedLessonIndex
    }
}