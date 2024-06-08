<script setup lang="ts">

const {
    hasEmptyModule,
    creatingLessons,
    onCompleteModule,
} = useCourseModule()

const { course } = useCourse()

const items = [{
    key: 'course',
    label: 'Edit Course',
    description: 'Make changes to your course content here. Click save when you\'re done.'
}, {
    key: 'modules',
    label: 'Edit Modules',
    description: 'Edit the course modules here. Click save when you are done.'
}]

function onDeleteLesson(e: { moduleIndex: number, lessonIndex: number }) {
    course.value.modules[e.moduleIndex].lessons.splice(e.lessonIndex, 1);
}

</script>

<template>
    <div class="h-screen w-full flex items-center justify-center overflow-y-hidden">
        <ClientOnly>
            <UCard class="w-[600px] h-[98%] max-h-full">
                <UTabs :items="items" class="w-full h-full">
                    <template #item="{ item }">
                        <UCard class="h-full">
                            <template #header>
                                <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    {{ item.label }}
                                </p>
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {{ item.description }}
                                </p>
                            </template>

                            <div v-if="item.key === 'course'" class="space-y-3 h-[60vh] overflow-y-auto">
                                <UFormGroup label="Course Name">
                                    <UInput placeholder="Search..." icon="i-heroicons-envelope" v-model="course.name" />
                                </UFormGroup>

                                <UFormGroup label="Meta Keywords">
                                    <UInput placeholder="Search..." icon="i-heroicons-envelope"
                                        v-model="course.meta_keywords" />
                                </UFormGroup>

                                <UFormGroup label="Meta Description">
                                    <UTextarea resize placeholder="Search..." v-model="course.meta_description" />
                                </UFormGroup>

                                <UFormGroup label="Description">
                                    <UTextarea resize placeholder="Search..." v-model="course.description" />
                                </UFormGroup>
                            </div>
                            <div v-else-if="item.key === 'modules'" class="space-y-3 h-[60vh] overflow-y-auto">
                                <EditModulesComponent :course-modules="course.modules"
                                    @delete-lesson="onDeleteLesson" />
                            </div>

                            <template #footer>
                                <hr class="pt-3 border-t-[.5px] border-gray-800">
                                <UButton :loading="creatingLessons" :disabled="hasEmptyModule" block
                                    @click="onCompleteModule(course)">
                                    {{ `Complete ${hasEmptyModule ? 'modules to continue' : ''}` }}
                                </UButton>
                            </template>
                        </UCard>
                    </template>
                </UTabs>
            </UCard>
        </ClientOnly>
    </div>
</template>
