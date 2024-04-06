<script setup>
import markdownit from 'markdown-it'
import Shikiji from 'markdown-it-shikiji'
import '@mervick/mdi-icons/css/material-icons.css'
import codeCopy from 'markdown-it-code-copy';


const md = markdownit({
    html: true
})
md.use(await Shikiji({
    themes: {
        light: 'github-dark',
        dark: 'vitesse-black'
    }
}))

md.use(codeCopy, {
    iconClass: "mdi-outlined mdi-content-copy",
    buttonClass: 'border border-gray-700 bg-gray-900 rounded p-1 text-white'
});

const props = defineProps(['content']);
const renderedContent = await md.render(props.content);

</script>

<template>
    <div v-if="!renderedContent">this is still loading</div>
    <div v-else class="p-5" v-html="renderedContent"></div>
</template>
<style>
pre.shiki {
    @apply p-5 text-[14px];
}

code:not(pre code) {
    @apply bg-gray-950 text-sm p-1 text-gray-400
}

/* pre.skiki code {
    @apply bg-red-500 ;
} */
</style>