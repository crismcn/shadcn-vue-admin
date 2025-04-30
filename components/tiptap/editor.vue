<template>
  <editor-content :editor="editor" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = ref()
onMounted(() => {
  editor.value = new Editor({
    content: `<p>I'm running Tiptap with Vue.js. 🎉</p>`,
    extensions: [StarterKit],
  })
})

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>
