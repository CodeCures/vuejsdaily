<script setup lang="ts">
import { computed, watchEffect } from 'vue';

const currentPage = ref(0)
const isOpen = ref(false);

const setCurrentPage = (pageNumber: any) => {
    currentPage.value = pageNumber
    isOpen.value = false
};

const route = useRoute();
const { modules } = useModule();
const module = modules.value[route.params.moduleId - 1]

const lessons = module?.lessons ?? [];
const currentLesson = computed(() => lessons[currentPage.value]);

const pageURl = ref(`http://localhost:3000/lessons/${route.params.moduleId}-${currentLesson.value?.slug}`);
watchEffect(() => pageURl.value = `http://localhost:3000/lessons/${route.params.moduleId}-${currentLesson.value?.slug}`);

const loadPage = () => {
    const urlParams = new URL(pageURl.value).pathname.split('/');
    const lastParam = urlParams[urlParams.length - 1];

    const lessonIndex = lessons.findIndex((lesson: { slug: string; }) => lesson.slug === lastParam);
    if (lessonIndex >= 0) currentPage.value = lessonIndex;
}

const { course } = useCourse()

const links = computed(() => [{
    label: 'Course',
    icon: 'i-heroicons-home',
    to: '/'
}, {
    label: course.value?.name,
    icon: 'i-heroicons-square-3-stack-3d'
}, {
    label: currentLesson.value.name,
    icon: 'i-heroicons-link'
}]);

const { generatingContent, generateLessonContent } = useLesson();

const generateContent = () => generateLessonContent(course.value.name, currentLesson.value)
</script>

<template>
    <ClientOnly>
        <div class="border-bottom h-[50px] flex items-center">
            <div class=" w-full flex justify-between px-5">
                <UBreadcrumb :links="links" class="flex items-center" />
                <UButton color="black" variant="solid">
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
                                <div class="text-lg tracking-wider font-light text-gray-300">{{ currentLesson.name }}</div>
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
                            <h4>Course Lessons</h4>
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
                <iframe :src="`/lessons/${route.params.moduleId}-${currentLesson.slug}`" frameborder="0"
                    class="w-full h-full"></iframe>
            </div>
        </div>
    </ClientOnly>
</template>
  
<style scoped>
.border-bottom {
    @apply border-b-[.5px] border-gray-700;
}
</style>