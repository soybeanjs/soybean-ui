<script setup lang="ts">
import { SButton, useLoadingBar } from '@soybeanjs/ui';

const loadingBar = useLoadingBar();

const start = () => {
  loadingBar.start();

  window.setTimeout(() => {
    loadingBar.finish();
  }, 1200);
};

const set = () => {
  loadingBar.set(60);
};

const error = () => {
  loadingBar.error();
};
</script>

<template>
  <div>
    <h3 class="playground-title">Loading Bar</h3>
    <div class="flex flex-wrap gap-3">
      <SButton @click="start">Start</SButton>
      <SButton variant="outline" @click="set">Set 60%</SButton>
      <SButton color="destructive" @click="error">Error</SButton>
    </div>
  </div>
</template>
