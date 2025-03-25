<script setup lang="ts">
import { ref } from 'vue';
import { SCard, STagsInput } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';

defineOptions({
  name: 'DemoTagsInput'
});

const tags = ref(['Apple', 'Banana', 'Cherry']);

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <SCard title="Size" split>
    <div v-for="size in sizes" :key="size">
      <div class="py-12px text-18px">{{ size }}</div>
      <STagsInput v-model="tags" :size="size" />
    </div>
  </SCard>
</template>

<style scoped></style>
