<script setup lang="ts">

import { debounce } from 'lodash';
import markdownParser from '@nuxt/content/transformers/markdown'
import type { ParsedContent } from '@nuxt/content/types';

const {
    items,
    links,
    pageURl,
    lessons,
    savingLessons,
    isSideBarOpen,
    currentLesson,
    generatingContent,
    currentLessonIndex,
    loadPage,
    setLessonIndex,
    generateContent,
    setCurrentModule,
    persistEditableModuleLessons,
} = useEditorConfig()

const parsedContent = ref<ParsedContent>();
parsedContent.value = await markdownParser.parse('', currentLesson.value?.content ?? '', {});

const parseMarkdown = async (content: any) => {
    parsedContent.value = await markdownParser.parse('', content, {});
};

const debouncedParseMarkdown = debounce(parseMarkdown, 300);

watch(currentLesson, async () => {
    if (currentLesson.value) {
        await nextTick();
        debouncedParseMarkdown(currentLesson.value.content ?? '');
    }
}, { deep: true });
</script>

<template>
    <ClientOnly>
        <div class="border-bottom h-[50px] flex items-center">
            <div class=" w-full flex justify-between px-5">
                <UBreadcrumb :links="links" class="flex items-center">
                    <template #default="{ link, isActive, index }">
                        <UDropdown v-if="index === 1" :items="items"
                            :ui="{ item: { disabled: 'cursor-text select-text' } }"
                            :popper="{ placement: 'bottom-start' }">
                            <UBadge :class="index === 1 ? 'cursor-pointer' : ''" :color="isActive ? 'primary' : 'gray'"
                                class="rounded-full truncate">
                                {{ link.label }}
                            </UBadge>
                            <template #item="{ item }">
                                <span @click="setCurrentModule(item.index)" class="truncate">{{ item.label }}</span>
                            </template>
                        </UDropdown>

                        <UBadge v-else :color="isActive ? 'primary' : 'gray'" class="rounded-full truncate">
                            {{ link.label }}
                        </UBadge>
                    </template>
                </UBreadcrumb>
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
                        <button @click="isSideBarOpen = true"
                            class="px-2 py-3 active:px-1 active:py-2 bg-gray-800 active:bg-gray-900 active:border-gray-800 rounded border-[.5px] border-gray-700">
                            <Icon name="simple-line-icons:arrow-left" class="text-[10px]" />
                        </button>
                        <div class="flex flex-col">
                            <UChip>
                                <div class="text-lg tracking-wider font-light text-gray-300">{{ currentLesson?.name
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

                <USlideover v-model="isSideBarOpen" :overlay="false" side="left">
                    <div class="flex-1">
                        <div class="h-[50px] border-bottom flex items-center px-5">
                            <h4>Module Lessons</h4>
                        </div>
                        <div class="px-5 py-5">
                            <ul class="space-y-3">
                                <li v-for="(  lesson, index  ) in   lessons  " :key="index">
                                    <UChip :show="currentLessonIndex === index">
                                        <a @click.prevent="setLessonIndex(index)"
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

                <template v-if="!currentLesson.content">
                    <div class="h-[90vh] w-full flex justify-center items-center">
                        <h4 class="text-4xl uppercase font-bold tracking-wider text-gray-700">No Content Found! </h4>
                    </div>
                </template>
                <ContentRendererMarkdown :value="parsedContent" />
            </div>
        </div>
    </ClientOnly>
</template>

<style scoped>
.border-bottom {
    @apply border-b-[.5px] border-gray-700;
}
</style>