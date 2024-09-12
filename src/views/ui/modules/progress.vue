<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TransitionPresets, useTransition } from '@vueuse/core';
import { SProgress } from 'soybean-ui';
import type { ProgressColor, ProgressSize } from 'soybean-ui';

defineOptions({
  name: 'UiProgress'
});

const colors: ProgressColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];
const sizes: ProgressSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const progress = ref(0);

const outputValue = useTransition(progress, {
  duration: 2000,
  transition: TransitionPresets.easeOutCubic
});

function start() {
  progress.value = 66;
}

onMounted(() => {
  start();
});
</script>

<template>
  <div class="w-320px lt-sm:w-auto">
    <div class="py-12px text-18px">Color</div>
    <div class="flex flex-col gap-12px">
      <SProgress v-for="color in colors" :key="color" :model-value="outputValue" :color="color" />
    </div>
    <div class="py-12px text-18px">Size</div>
    <div class="flex flex-col gap-12px">
      <SProgress
        v-for="(size, index) in sizes"
        :key="size"
        :model-value="outputValue"
        :color="colors[index]"
        :size="size"
      >
        {{ size }}
      </SProgress>
    </div>
  </div>
</template>

<style scoped></style>
