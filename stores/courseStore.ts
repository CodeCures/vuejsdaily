import type { ICourse } from "~/types";

export const useCourseStore = defineStore('courses', {
    state: () => {
        return {
            courses: [] as ICourse[],
            course: null as ICourse | null
        }
    },
    actions: {
        async getCourses() {
            const { fetchCourses } = useCourse();

            this.courses = await fetchCourses();
        },
        getCourse(slug: string) {
            this.course = this.courses.find(
                (course) => course.slug === slug
            ) as ICourse;
        }
    },
    persist: true,
})