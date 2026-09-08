<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { SxMarkdown } from '@soybeanjs/ui-x';

const chunks = [
  'The **Vue 3** composition',
  'The **Vue 3** composition API lets you organize',
  'The **Vue 3** composition API lets you organize logic by **feature** using',
  'The **Vue 3** composition API lets you organize logic by **feature** using the `setup` function.'
];

const content = ref('');
const final = ref(false);

let timer: number | undefined;

onMounted(() => {
  let index = 0;
  timer = window.setInterval(() => {
    content.value = chunks[index];
    index += 1;
    if (index >= chunks.length) {
      if (timer) window.clearInterval(timer);
      final.value = true;
    }
  }, 900);
});

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer);
});
</script>

<template>
  <SxMarkdown :content="content" :final="final" />
</template>
