<script setup lang="ts">
const {
    hasContent,
    courseModules,
    hasEmptyModule,
    onUpdateLessons,
    creatingLessons,
    onCompleteModule,
    isGeneratingContent,
    generateModuleContent,
} = useCourseModule()
</script>

<template>
    <div class="h-screen w-full flex items-center justify-center overflow-y-hidden">
        <UCard class="w-[600px] max-h-full overflow-y-auto">
            <Suspense>
                <ClientOnly>
                    <UAccordion :items="courseModules">
                        <template #default="{ item, index, open }">
                            <UButton color="gray" variant="ghost" class="border-b border-gray-200 dark:border-gray-700"
                                :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
                                <template #leading>
                                    <div class="w-6 h-6 rounded-full flex items-center justify-center -my-1"
                                        :class="hasContent(item) ? 'bg-primary-500 dark:bg-primary-400' : 'bg-red-500 dark:bg-red-400'">
                                        <UIcon
                                            :name="hasContent(item) ? 'i-heroicons-check-badge' : 'i-heroicons-lock-closed-20-solid'"
                                            class="w-4 h-4 text-white dark:text-gray-900" />
                                    </div>
                                </template>

                                <span class="truncate">{{ index + 1 }}. {{ item.name }}</span>

                                <template #trailing>
                                    <UIcon name="i-heroicons-chevron-right-20-solid"
                                        class="w-5 h-5 ms-auto transform transition-transform duration-200"
                                        :class="[open && 'rotate-90']" />
                                </template>
                            </UButton>
                        </template>
                        <template #item="{ item, index }">
                            <template v-if="hasContent(item)">
                                <UForm :state="{}" class="space-y-3">
                                    <UFormGroup>
                                        <UTextarea resize placeholder="Description" v-model="item.description" />
                                    </UFormGroup>
                                    <LessonField :lessons="item.lessons" :index="index" @update-lessons="onUpdateLessons" />

                                    <UFormGroup class="h-3" />
                                    <hr class="border-gray-500 w-full pb-3">
                                </UForm>
                            </template>
                            <template v-else>
                                <div class="h-[150px] flex flex-col items-center justify-center space-y-5">
                                    <h4 class="text-2xl font-bold tracking-wider">
                                        {{ isGeneratingContent(index) ? 'Preparing module content' : 'No Content Found!' }}
                                    </h4>
                                    <UButton :loading="isGeneratingContent(index)" @click="generateModuleContent(index)"
                                        block>
                                        {{ isGeneratingContent(index) ? 'Generating' : 'Generate' }} Content
                                    </UButton>
                                </div>
                            </template>
                        </template>
                    </UAccordion>
                    <hr class="pt-3 border-t-[.5px] border-gray-800">
                    <UButton :loading="creatingLessons" :disabled="hasEmptyModule" block @click="onCompleteModule">
                        {{ `Complete ${hasEmptyModule ? 'modules to continue' : ''}` }}
                    </UButton>
                </ClientOnly>
            </Suspense>
        </UCard>
    </div>
</template>

