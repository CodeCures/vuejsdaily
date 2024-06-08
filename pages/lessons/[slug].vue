<script setup lang="ts">
import markdownParser from '@nuxt/content/transformers/markdown'

const { courses, currentCourseIndex } = useCourse();
const { currentModuleIndex } = useModule();
const { selectedLessonIndex } = useLesson();
const selectedLesson = computed(
    () => courses.value[currentCourseIndex.value]?.modules[currentModuleIndex.value].lessons[selectedLessonIndex.value]
)
let content = await markdownParser.parse('', selectedLesson.value?.content ?? '', {});
watch(selectedLesson, async (newValue, oldValue) => {
    if (!oldValue.content || newValue.content === oldValue.content) return;
    content = await markdownParser.parse('', selectedLesson.value.content ?? '', {})

})

</script>

<template>
    <div>
        <ClientOnly>
            <template v-if="!selectedLesson.content">
                <div class="h-[90vh] w-full flex justify-center items-center">
                    <h4 class="text-4xl uppercase font-bold tracking-wider text-gray-700">No Content Found! </h4>
                </div>
            </template>
            <ContentRendererMarkdown :value="content" />
        </ClientOnly>
    </div>
</template>
