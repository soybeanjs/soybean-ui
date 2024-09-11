<script setup lang="ts">
import { SProgress } from 'soybean-ui';
import type { ProgressColor, ProgressSize } from 'soybean-ui';
import { ref, watchEffect } from 'vue';

defineOptions({
  name: 'UiProgress'
});

const colors: ProgressColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];
const sizes: ProgressSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const progress = ref(13);

watchEffect(cleanupFn => {
  const timer = setTimeout(() => (progress.value = 66), 500);
  cleanupFn(() => clearTimeout(timer));
});
</script>

<template>
  <div class="py-12px text-18px">Color</div>
  <div class="flex flex-col gap-12px">
    <SProgress v-for="color in colors" :key="color" v-model="progress" :color="color" />
  </div>
  <div class="py-12px text-18px">Size</div>
  <div class="flex flex-col gap-12px">
    <SProgress v-for="(size, index) in sizes" :key="size" v-model="progress" :color="colors[index]" :size="size">
      {{ size }}
    </SProgress>
  </div>
</template>

<style scoped></style>
