<script setup lang="ts">
import type { ILesson, IModule } from '~/types';

const currentPage = ref(0);
const isOpen = ref(false);

const { selectedLessonIndex } = useLesson()
onBeforeUnmount(() => selectedLessonIndex.value = 0);

const setCurrentPage = (pageNumber: number) => {
    currentPage.value = pageNumber;
    selectedLessonIndex.value = pageNumber;

    isOpen.value = false;
};

const { courses, currentCourseIndex } = useCourse()

const {
    savingLessons,
    currentModuleIndex,
    persistEditableModuleLessons
} = useModule();

const currentEditableModule = computed(
    () => courses.value[currentCourseIndex.value]?.modules[currentModuleIndex.value] as IModule
);


// Module Lessons
const lessons = reactive(currentEditableModule.value?.lessons as ILesson[]);
const currentLesson = ref({} as ILesson);
onMounted(() => currentLesson.value = lessons[currentPage.value] as ILesson);
watchEffect(() => lessons && (currentLesson.value = lessons[currentPage.value] as ILesson));

// Construct pageUrl
const pageURl = ref('');
watchEffect(() => pageURl.value = `http://localhost:3000/lessons/${currentLesson.value?.slug}`);

// Extract Names
const moduleName = computed(() => extractNameFromSlug(currentEditableModule.value.slug as string));
const courseName = computed(() => extractNameFromSlug(currentEditableModule.value.course_slug as string));

const loadPage = () => {
    const urlParams = new URL(pageURl.value).pathname.split('/');
    const lastParam = urlParams[urlParams.length - 1];

    const lessonIndex = lessons.findIndex(lesson => lesson.slug === lastParam);
    if (lessonIndex >= 0) currentPage.value = lessonIndex;
}

const links = computed(() => [
    {
        label: courseName.value,
        icon: 'i-heroicons-home',
        to: `/courses/${currentEditableModule.value.course_slug}`
    },
    {
        label: moduleName.value,
        icon: 'i-heroicons-square-3-stack-3d'
    },
    {
        label: currentLesson.value.name,
        icon: 'i-heroicons-link',
    }
]);

const { generatingContent, generateLessonContent } = useLesson();
const generateContent = () => generateLessonContent(courseName.value, currentLesson.value as ILesson)

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
</script>

<template>
    <ClientOnly>
        <div class="border-bottom h-[50px] flex items-center">
            <div class=" w-full flex justify-between px-5">
                <UBreadcrumb :links="links" class="flex items-center" />
                <UButton :loading="savingLessons" @click="persistEditableModuleLessons" color="black" variant="solid">
                    save
                    <Icon name="la:save" />
                </UButton>
            </div>
        </div>

        <div class="flex h-[93vh]">
            <div class="w-[31%] h-full overflow-y-auto border-r-[.5px] border-gray-700">
                <div class="px-5 h-[70px] flex justify-between items-center border-bottom">
                    <div class="flex items-center space-x-3">
                        <button @click="isOpen = true"
                            class="px-2 py-3 active:px-1 active:py-2 bg-gray-800 active:bg-gray-900 active:border-gray-800 rounded border-[.5px] border-gray-700">
                            <Icon name="simple-line-icons:arrow-left" class="text-[10px]" />
                        </button>
                        <div class="flex flex-col">
                            <UChip>
                                <div class="text-lg tracking-wider font-light text-gray-300">{{ currentLesson.name
                                    }}
                                </div>
                            </UChip>
                            <span class="text-sm font-thin tracking-wide">Edit your content file.</span>
                        </div>
                    </div>
                    <UButton @click="generateContent" :loading="generatingContent" variant="solid" :padding="false"
                        color="gray"
                        class="text-xl font-light tracking-widest p-2 border-[.5px] border-gray-700 active:text-lg rounded">
                        Ai</UButton>
                </div>

                <USlideover v-model="isOpen" :overlay="false" side="left">
                    <div class="flex-1">
                        <div class="h-[50px] border-bottom flex items-center px-5">
                            <h4>Module Lessons</h4>
                        </div>
                        <div class="px-5 py-5">
                            <ul class="space-y-3">
                                <li v-for="(lesson, index) in lessons" :key="index">
                                    <UChip :show="currentPage === index">
                                        <a @click.prevent="setCurrentPage(index)"
                                            class="flex items-center space-x-2 text-gray-300 cursor-pointer">
                                            <Icon name="heroicons-outline:document-text" class="text-3xl" />
                                            <div class="tracking-widest">{{ lesson.name }}</div>
                                        </a>
                                    </UChip>
                                </li>
                            </ul>
                        </div>
                    </div>
                </USlideover>
                <TextEditor v-model="currentLesson.content" />
            </div>

            <div class="w-[69%] h-full overflow-y-auto">
                <div class="h-[40px] bg-gray-800 flex items-center space-x-2">
                    <button class="bg-gray-900 p-1 rounded ml-2">
                        <Icon name="material-symbols-light:water-lock-outline" class="text-lg" />
                    </button>
                    <button>
                        <Icon name="material-symbols-light:refresh-rounded" class="text-2xl" />
                    </button>
                    <form @submit.prevent="loadPage" class="w-11/12">
                        <input
                            class="h-[30px] w-full bg-gray-700 rounded-full text-sm text-gray-400 flex items-center px-3 tracking-wide italic focus:outline-none"
                            v-model="pageURl">
                    </form>
                </div>

                <iframe :src="`/lessons/${currentLesson.slug}`" frameborder="0" class="w-full h-full"></iframe>
            </div>
        </div>
    </ClientOnly>
</template>

<style scoped>
.border-bottom {
    @apply border-b-[.5px] border-gray-700;
}
</style>