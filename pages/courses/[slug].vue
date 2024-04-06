<script setup lang="ts">
import type { IModule } from '~/types';

const { courses, currentCourseIndex } = useCourse();
const course = computed(() => courses.value[currentCourseIndex.value]);

const modules = computed(() => course.value?.modules as IModule[])

const filter = ref('');
const filteredModules = computed(() => modules.value?.filter(
    m => (m.name.toLocaleLowerCase()).includes(filter.value.toLocaleLowerCase()))
)
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen space-y-5">
        <div class="w-4/5 space-x-5">
            <input type="text" v-model="filter"
                class="w-[89%] focus:outline-none h-10 px-3 bg-gray-800 placeholder:tracking-wider placeholder:text-gray-500"
                placeholder="Search entire course list">
            <button class="bg-indigo-700 p-2">Search</button>
        </div>
        <div class="p-5 w-4/5 h-[80vh] overflow-y-auto border-[.5px] border-gray-700 shadow-2xl grid grid-cols-4 gap-5">
            <ClientOnly>
                <Suspense>
                    <ModuleCard v-for="(module, index) in filteredModules" :key="index" :module="module"
                        :index="index" />
                    <template #fallback>
                        this is the fallback
                    </template>
                </Suspense>
            </ClientOnly>
        </div>
    </div>
</template>