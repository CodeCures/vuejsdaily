<template>
    <div class="w-full h-screen flex flex-col items-center justify-center space-y-10">
        <span class="loader"></span>
        <div class="w-[400px] flex flex-col justify-center items-center space-y-3">
            <h4 class="uppercase tracking-widest font-semibold">Configuring course content {{ batchData.batch_progress
                }} %</h4>
            <p class="text-sm text-gray-300"> Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Eos vero omnis
                quod. Beatae,
                facilis praesentium
                reprehenderit voluptatibus, ipsam iste velit deserunt, nemo asperiores ducimus ab ad quia. Dicta, eum.
                Quidem.</p>
        </div>
    </div>

</template>

<script setup>
import { watchEffect } from 'vue';


const route = useRoute();
const { batchData, checkBatchProgress } = useCourse()

let intervalId;

onMounted(() => {
    if (!batchData.value.batch_finished) {
        intervalId = setInterval(() => checkBatchProgress(route.query), 500);
    }
})

onUnmounted(() => clearInterval(intervalId));

const router = useRouter();

watchEffect(() => {
    if (batchData.value.batch_finished) {
        clearInterval(intervalId);
        router.push("/content/editor")
    }
})

</script>

<style lang="scss" scoped>
.loader {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    background: linear-gradient(0deg, rgba(208, 99, 66, 0.06) 33%, #49de80 100%);
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

.loader::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background: #263238;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg)
    }

    100% {
        transform: rotate(360deg)
    }
}
</style>