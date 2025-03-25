<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TransitionPresets, useTransition } from '@vueuse/core';
import { SCard, SProgress } from 'soy-ui';
import type { ThemeColor } from 'soy-ui';

defineOptions({
  name: 'DemoProgress'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];

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
  <div class="flex-c gap-4">
    <SCard title="Color" split>
      <div class="w-320px flex flex-c gap-12px lt-sm:w-auto">
        <SProgress v-for="color in colors" :key="color" :model-value="outputValue" :color="color" />
      </div>
    </SCard>
  </div>
</template>
