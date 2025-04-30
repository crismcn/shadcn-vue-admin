<template>
  <div>
    <!-- 请注意，Tiptap 需要在客户端运行，而不是在服务器上运行。需要将编辑器包装在<client-only>标签中 -->
    <tiptap-editor />
  </div>
</template>

<script setup>
const content = ref(`<p>I'm running Tiptap with Vue.js. 🎉</p>`)
</script>
