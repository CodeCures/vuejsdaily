<script setup>
import markdownit from 'markdown-it'
import '@mervick/mdi-icons/css/material-icons.css'
import codeCopy from 'markdown-it-code-copy';
import prism from 'markdown-it-prism';

const md = markdownit()
md.use(prism)

md.use(codeCopy, {
    iconClass: "mdi-outlined mdi-content-copy",
    buttonClass: 'border border-gray-400 bg-gray-900 rounded p-2 text-white'
});

defineProps(['content']);
</script>

<template>
    <div v-html="md.render(content)"></div>
</template>