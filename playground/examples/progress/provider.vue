<script setup lang="ts">
import { SButton, progress } from '@soybeanjs/ui';

const start = () => {
  progress.start();

  window.setTimeout(() => {
    progress.done();
  }, 1200);
};

const increment = () => {
  progress.inc();
};

const set = () => {
  progress.set(0.6);
};
</script>

<template>
  <div>
    <h3 class="playground-title">Progress API</h3>
    <div class="flex flex-wrap gap-3">
      <SButton @click="start">Start</SButton>
      <SButton variant="outline" @click="increment">Increment</SButton>
      <SButton variant="outline" @click="set">Set 60%</SButton>
    </div>
  </div>
</template>
