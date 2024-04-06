<script setup>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

const model = defineModel();

function highlighter(code) {
    return highlight(code, languages.js);
}
</script>

<template>
    <div>
        <prism-editor class="my-editor" v-model="model" :highlight="highlighter" line-numbers></prism-editor>
    </div>
</template>
  
<style>
.my-editor {
    /* background: #2d2d2d; */
    /* color: #ccc; */

    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
}

.prism-editor__textarea:focus {
    outline: none;
}
</style>