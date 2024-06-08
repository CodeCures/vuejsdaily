<script setup lang="ts">
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useSortable } from '@vueuse/integrations/useSortable'

const {
    hasContent,
    hasEmptyModule,
    onUpdateLessons,
    creatingLessons,
    onCompleteModule,
    isGeneratingContent,
    generateModuleContent,
} = useCourseModule()


const props = defineProps({
    courseModules: {
        type: Array,
        default: []
    }
});

const emit = defineEmits(['deleteLesson'])

function deleteLesson(moduleIndex: number, lessonIndex: number) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            emit("deleteLesson", { moduleIndex, lessonIndex })
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}


</script>

<template>
    <Suspense>
        <ClientOnly>
            <div>
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
                        <UForm :state="{}" class="space-y-3">
                            <UFormGroup lable="Description">
                                <UTextarea resize placeholder="Description" v-model="item.description" />
                            </UFormGroup>
                            <h4 class="text-gray-200 pt-4 tracking-wider">Module Lessons</h4>
                            <template v-for="(lesson, lessonIndex) in item.lessons" :key="lessonIndex">
                                <div class="flex space-x-5">
                                    <LessonNameField class="w-[90%]" v-model="lesson.name" />
                                    <UButton @click="deleteLesson(index, lessonIndex)" color="red" variant="solid"
                                        size="sm" icon="i-heroicons-trash-16-solid">
                                    </UButton>
                                </div>
                            </template>
                            <UFormGroup class="h-3" />
                            <hr class="border-gray-500 w-full pb-3">
                        </UForm>

                        <!-- <template v-if="hasContent(item)">
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
                                {{ isGeneratingContent(index) ? 'Preparing module content' : 'NoContent Found!' }}
                            </h4>
                            <UButton :loading="isGeneratingContent(index)" @click="generateModuleContent(index)" block>
                                {{ isGeneratingContent(index) ? 'Generating' : 'Generate' }}
                                Content
                            </UButton>
                        </div>
                    </template> -->
                    </template>
                </UAccordion>
            </div>
        </ClientOnly>
    </Suspense>
</template>
