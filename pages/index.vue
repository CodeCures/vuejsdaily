<script setup>
const { courses, currentCourseIndex, fetchCourses } = useCourse();
fetchCourses();
</script>

<template>
  <ClientOnly>
    <section class="h-screen flex justify-center items-center antialiased text-gray-600 min-h-screen p-4 space-x-5">
      <CourseCard v-for="(course, index) in courses" :key="course.id" :course="course"
        @click="() => currentCourseIndex = index" />
    </section>
  </ClientOnly>
</template>