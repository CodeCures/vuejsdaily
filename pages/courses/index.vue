<script setup lang="ts">
import type { LevelKey } from '~/types';

const isOpen = ref(false);

const { loadingTags, tags, getTags } = useTags();
const selectedTag = ref(tags.value[0]);
onMounted(async () => {
    await getTags();
    selectedTag.value = tags.value[0]
})

const selectedLevel = ref('First Timer');

const { courses, course, generateCourseName, isGeneratingCourseName } = useCourse()
const generateCourse = () => generateCourseName(selectedTag.value?.name, selectedLevel.value as LevelKey)
</script>

<template>
    <UModal v-model="isOpen" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Create course
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="isOpen = false" />
                </div>
            </template>
            <form class=" h-[300px] flex flex-col items-center justify-center">
                <div class="w-full space-y-4">
                    <UFormGroup label="Course Name" name="course">
                        <USelectMenu :loading="loadingTags" searchable searchable-placeholder="Search a diet"
                            placeholder="Chose a domain" :options="tags" option-attribute="name"
                            :search-attributes="['name']" v-model="selectedTag" class="w-full" />
                    </UFormGroup>

                    <UFormGroup label="Course Level" name="level">
                        <USelect :options="['First Timer', 'Beginner', 'Intermediate', 'Advanced']"
                            v-model="selectedLevel" />
                    </UFormGroup>

                    <UButton :loading="isGeneratingCourseName || loadingTags" class="relative float-right"
                        @click="generateCourse">
                        <template v-if="isGeneratingCourseName">
                            Generating...
                        </template>
                        <template v-else>
                            Generate Course Name
                        </template>
                        <div
                            class="text-xs absolute -top-1 -right-1 w-5 h-5 bg-primary flex items-center justify-center rounded-full">
                            ai
                        </div>
                    </UButton>
                </div>
            </form>
        </UCard>
    </UModal>
    <div class="flex flex-col items-center justify-center h-screen space-y-5">
        <div class="w-4/5 space-x-5">
            <input type="text"
                class="w-[89%] focus:outline-none h-10 px-3 bg-gray-800 placeholder:tracking-wider placeholder:text-gray-500"
                placeholder="Search entire course list">
            <button class="bg-indigo-700 p-2" @click="isOpen = true">New Course</button>
        </div>
        <div class="p-5 w-4/5 h-[80vh] border-[.5px] border-gray-700 shadow-2xl">
            <div v-for="c in courses"
                class="bg-gray-100 shadow-xl w-[200px] text-gray-600 p-3 space-y-3 border-b-8 border-purple-800 relative">
                <div>
                    <h4 class="font-semibold text-md tracking-wider">{{ c.name }}</h4>
                    <span class="text-xs">1st Nov, 2024</span>
                </div>
                <hr>
                <div class="flex justify-between">
                    <div class="flex flex-col items-center text-sm">
                        <h4>Modules</h4>
                        <div class="font-bold text-md">12</div>
                    </div>
                    <div class="flex flex-col items-center text-sm">
                        <h4>Lessons</h4>
                        <div class="font-bold text-md">23</div>
                    </div>
                    <div class="flex flex-col items-center text-sm">
                        <h4>Views</h4>
                        <div class="font-bold text-md">35</div>
                    </div>
                </div>
                <button
                    class="bg-purple-800 w-6 h-6 rounded-tl-2xl absolute -bottom-2 right-0 flex items-center justify-center text-white">
                    <Icon name="f7:info" />
                </button>
            </div>
        </div>
    </div>
</template>


<style scoped></style>