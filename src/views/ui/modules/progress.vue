<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TransitionPresets, useTransition } from '@vueuse/core';
import { SProgress } from 'soy-ui';
import type { ThemeColor, ThemeSize } from 'soy-ui';

defineOptions({
  name: 'UiProgress'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

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
    <div class="flex flex-c gap-12px">
      <SProgress v-for="color in colors" :key="color" :model-value="outputValue" :color="color" />
    </div>
    <div class="py-12px text-18px">Size</div>
    <div class="flex flex-c gap-12px">
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
