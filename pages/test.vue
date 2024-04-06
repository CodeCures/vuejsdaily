<script setup>
import markdownParser from '@nuxt/content/transformers/markdown'
import data from '~/md.json'
import { generateCourseContent } from '~/utils/aiprompts';

const result = await markdownParser.parse(null, data.content)
const { $ai } = useNuxtApp()

const response = await $ai.generateUsingObject(generateCourseContent());

console.log(response);
</script>

<template>
  <template v-if="result">
    <!-- <ContentRendererMarkdown :value="result" /> -->
    <div>
      <pre>
        {{ response }}
      </pre>
    </div>
  </template>
</template>