<script setup lang="ts">
import type { IModule } from "~/types";

defineProps({
    module: {
        type: Object as () => IModule,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
});
function shuffleColors<T>(colors: Array<T>) {
    const shuffledColors = colors.slice();
    for (let i = shuffledColors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledColors[i], shuffledColors[j]] = [shuffledColors[j], shuffledColors[i]];
    }

    return shuffledColors[0];
}
const { currentModuleIndex } = useModule()

const color = computed(() => shuffleColors(['pink-500/95', 'purple-800', 'indigo-700', 'yellow-500/95', 'violet-500/90']));
</script>
<template>
    <ClientOnly>
        <div class="bg-gray-100 shadow-xl col-span-1 h-fit text-gray-600 p-3 space-y-3 border-b-8 relative"
            :class="`border-${color}`">
            <NuxtLink :to="`/content/editor/${module.slug}`" @click="currentModuleIndex = index">
                <div class="h-20">
                    <h4 class="font-semibold text-md tracking-wider line-clamp-2">{{ module.name }}</h4>
                    <span class="text-xs">1st Nov, 2023</span>
                </div>
                <hr>
                <div class="flex justify-between">
                    <div class="flex flex-col items-center text-sm">
                        <h4>Modules</h4>
                        <div class="font-bold text-md">1</div>
                    </div>
                    <div class="flex flex-col items-center text-sm">
                        <h4>Lessons</h4>
                        <div class="font-bold text-md">{{ module.lessons.length }}</div>
                    </div>
                    <div class="flex flex-col items-center text-sm">
                        <h4>Views</h4>
                        <div class="font-bold text-md">0</div>
                    </div>
                </div>
            </NuxtLink>
            <button :class="`bg-${color}`"
                class="w-6 h-6 rounded-tl-2xl absolute -bottom-2 right-0 flex items-center justify-center text-white">
                <Icon name="f7:info" />
            </button>
        </div>
    </ClientOnly>
</template>
