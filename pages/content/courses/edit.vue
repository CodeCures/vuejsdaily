<template>
    <div class="w-[400px] h-[80vh] mx-auto flex justify-center items-center">
        <UInput class="w-full" v-model="q" :disabled="!editable" name="q" autocomplete="off"
            icon="i-heroicons-document-text" :ui="{ icon: { trailing: { pointer: '' } } }">
            <template #trailing>

                <UButton v-if="editable" v-show="q !== ''" color="green" variant="link"
                    icon="i-heroicons-check-badge-16-solid" :padded="false" @click="editable = false" />

                <UButton v-else color="gray" variant="link" icon="i-heroicons-pencil-square-16-solid" :padded="false"
                    @click="editable = true" />

            </template>
        </UInput>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const q = ref('this is the current value')
const editable = ref(false);
</script>