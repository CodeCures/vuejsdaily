<script setup>
import { ref, watch } from 'vue';

const data = ref('');
const lineNumbers = ref(null);
const lineNumberContent = ref('');

function updateLineNumbers() {
    const lines = data.value.split('\n').length;
    lineNumberContent.value = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}

watch(data, updateLineNumbers);
</script>

<template>
    <div class="relative flex">
        <textarea id="editor" v-model="data" @input="updateLineNumbers"></textarea>
        <div id="line-numbers" ref="lineNumbers" v-html="lineNumberContent"></div>
    </div>
</template>

<style scoped>
#editor {
    font-size: 16px;
    line-height: 1.5;
    border: 1px solid #ccc;
    width: 80%;
    resize: vertical;
    overflow: auto;
}

#line-numbers {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    padding: 10px;
    background-color: #f4f4f4;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    user-select: none;
}
</style>