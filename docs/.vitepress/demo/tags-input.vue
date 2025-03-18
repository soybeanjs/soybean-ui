<script setup lang="ts">
import { ref } from 'vue';
import { STagsInput } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';

const tags = ref(['Apple', 'Banana', 'Cherry']);

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

defineOptions({
  name: 'UiTagsInput'
});
</script>

<template>
  <div>
    <div class="py-12px text-18px">Size</div>
    <div v-for="size in sizes" :key="size">
      <div class="py-12px text-18px">{{ size }}</div>
      <STagsInput v-model="tags" :size="size" />
    </div>
  </div>
</template>

<style scoped></style>
