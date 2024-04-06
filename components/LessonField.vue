<script setup lang="ts">
const props = defineProps(['lessons', 'index']);
const lessonsString = computed(() => props.lessons.join('\n'))
const lessonsData = ref(lessonsString.value)

const emit = defineEmits(['updateLessons']);
const onUpdateLesson = (input: { target: { value: any; }; }) => {
    emit('updateLessons', { input, index: props.index })
}
</script>

<template>
    <UFormGroup label="Lessons">
        <UTextarea resize placeholder="Lessons" :model-value="lessonsData" @update:model-value="onUpdateLesson" />
    </UFormGroup>
</template>

<style scoped></style>