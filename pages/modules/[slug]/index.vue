<script setup lang="ts">
const route = useRoute();
const { module, getModule } = useModule();
await getModule(route.params.slug as string)
</script>
<template>
    <UCard class="h-screen w-full flex items-center justify-center">
        <div class="w-[600px] space-y-5">
            <Suspense>
                <ClientOnly>
                    <h1 class="text-4xl">{{ module.name }}</h1>
                    <p>{{ module.description }}</p>
                    <template v-if="module.lessons.length > 0">
                        <div class="space-y-2">
                            <h4 class="text-2xl font-semibold">Lessons</h4>
                            <ul>
                                <li v-for="(lesson, index) in module.lessons" :key="index">{{ lesson.name }}</li>
                            </ul>
                        </div>
                    </template>
                    <UButton block>Prepare Lessons</UButton>
                </ClientOnly>
                <template #fallback>
                    this is the fallback
                </template>
            </Suspense>
        </div>
    </UCard>
</template>