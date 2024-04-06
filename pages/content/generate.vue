<script setup lang="ts">
const {
    tags,
    isLoading,
    loadingTags,
    selectedTag,
    selectedLevel,
    generateCourse,
    isGeneratingCourseName
} = useGenerateContent()
</script>

<template>
    <div class="flex h-screen w-full items-center justify-center">
        <ClientOnly>
            <UCard class="w-[400px]" :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <form class="h-[300px] flex flex-col items-center justify-center">
                    <div class="w-full space-y-4">
                        <UFormGroup label="Course Name" name="course">
                            <USelectMenu :loading="isLoading" searchable searchable-placeholder="Search a diet"
                                placeholder="Chose a domain" :options="tags" option-attribute="name"
                                :search-attributes="['name']" v-model="selectedTag" class="w-full" />
                        </UFormGroup>

                        <UFormGroup label="Course Level" name="level">
                            <USelect :loading="isLoading" :options="['Beginner', 'Intermediate', 'Advanced']"
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
        </ClientOnly>
    </div>
</template>
