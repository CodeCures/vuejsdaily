<template>
    <div>
        <UInput class="w-full" v-model="model" :disabled="!editable" name="q" autocomplete="off"
            icon="i-heroicons-document-text" :ui="{ icon: { trailing: { pointer: '' } } }">
            <template #trailing>

                <UButton v-if="editable" v-show="model !== ''" color="green" variant="link"
                    icon="i-heroicons-check-badge-16-solid" :padded="false" @click="editable = false" />

                <UButton v-else color="gray" variant="link" icon="i-heroicons-pencil-square-16-solid" :padded="false"
                    @click="editable = true" />
            </template>
        </UInput>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const editable = ref(false);

const model = defineModel()
</script>
