<script setup>
const {
    course,
    loading,
    saveCourse,
    regenerate,
    isRegenerating,
    preparingModules
} = useCourseContentPreview()
</script>
<template>
    <div class="h-screen w-full flex items-center justify-center">
        <ClientOnly>
            <UCard class="w-[500px]" draggable>
                <UForm class="space-y-4" :state="{}">

                    <UFormGroup class="relative">
                        <UInput :loading="isRegenerating('name')"
                            :disabled="isRegenerating('name') || preparingModules || loading" v-model="course.name"
                            name="name" placeholder="Course Name" icon="i-heroicons-check-badge" autocomplete="off"
                            :ui="{ icon: { trailing: { pointer: '' } } }">
                        </UInput>
                        <UButton :disabled="isRegenerating('name') || preparingModules || loading"
                            @click="regenerate('name')" color="gray" variant="link" :padded="false"
                            class="text-xs absolute -top-4 right-5">
                            Rewrite
                        </UButton>
                    </UFormGroup>

                    <UFormGroup class="relative" label="Meta keywords">
                        <UInput :loading="isRegenerating('meta_keywords')" v-model="keywordsString"
                            :disabled="isRegenerating('meta_keywords') || preparingModules || loading" name="meta_keywords"
                            placeholder="Meta Keywords" icon="i-heroicons-bars-3" autocomplete="off"
                            :ui="{ icon: { trailing: { pointer: '' } } }">
                        </UInput>
                        <UButton color="gray" variant="link" :padded="false"
                            :disabled="isRegenerating('meta_keywords') || preparingModules || loading"
                            @click="regenerate('meta_keywords')" class="text-xs absolute -top-4 right-5">
                            Rewrite
                        </UButton>
                    </UFormGroup>

                    <UFormGroup label="Course Description" class="relative">
                        <UTextarea :disabled="isRegenerating('description') || preparingModules || loading" resize
                            placeholder="Course Description" v-model="course.description" />
                        <UButton :loading="isRegenerating('description')" color="gray" variant="link" :padded="false"
                            :disabled="isRegenerating('description') || preparingModules || loading"
                            @click="regenerate('description')" class="absolute -top-5 right-2 text-xs">
                            Rewrite
                        </UButton>
                    </UFormGroup>

                    <UFormGroup label="Meta Description" class="relative">
                        <UTextarea :disabled="isRegenerating('meta_description') || preparingModules || loading" resize
                            placeholder="Meta Description" v-model="course.meta_description" />
                        <UButton :loading="isRegenerating('meta_description')"
                            :disabled="isRegenerating('meta_description') || preparingModules || loading"
                            @click="regenerate('meta_description')" color="gray" variant="link" :padded="false"
                            class="absolute -top-5 right-2 text-xs">
                            Rewrite
                        </UButton>
                    </UFormGroup>

                    <UFormGroup label="Modules" class="relative">
                        <UTextarea :disabled="isRegenerating('modules') || preparingModules || loading" resize
                            placeholder="Modules" v-model="modulesString" />
                        <UButton :loading="isRegenerating('modules')"
                            :disabled="isRegenerating('modules') || preparingModules || loading"
                            @click="regenerate('modules')" color="gray" variant="link" :padded="false"
                            class="absolute -top-5 right-2 text-xs">
                            Rewrite
                        </UButton>
                    </UFormGroup>

                    <UButton :loading="loading || preparingModules" @click="saveCourse" color="primary" variant="solid"
                        block>
                        Continue</UButton>
                </UForm>
            </UCard>
        </ClientOnly>
    </div>
</template>
