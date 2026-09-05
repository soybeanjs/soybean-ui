<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { SxMarkdown } from '@soybeanjs/ui-x';

const chunks = [
  'The **Vue 3** composition',
  'The **Vue 3** composition API lets you organize',
  'The **Vue 3** composition API lets you organize logic by **feature** using',
  'The **Vue 3** composition API lets you organize logic by **feature** using the `setup` function.'
];

const content = ref('');
const final = ref(false);
let index = 0;
let timer: ReturnType<typeof setInterval> | undefined;

// 仅在客户端启动流式定时器，保证 SSR 预渲染与首帧 hydration 输出一致
onMounted(() => {
  timer = setInterval(() => {
    content.value = chunks[index];
    index += 1;
    if (index >= chunks.length) {
      clearInterval(timer);
      final.value = true;
    }
  }, 900);
});

onUnmounted(() => {
  if (timer !== undefined) {
    clearInterval(timer);
  }
});
</script>

<template>
  <SxMarkdown :content="content" :final="final" />
</template>
