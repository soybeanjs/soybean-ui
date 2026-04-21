<script setup lang="ts">
import { SButton, progress } from '@soybeanjs/ui';

function start() {
  progress.start();

  setTimeout(() => {
    progress.done();
  }, 300);
}

function set() {
  progress.set(0.6);

  setTimeout(() => {
    progress.done();
  }, 500);
}
</script>

<template>
  <div>
    <h3 class="playground-title">Progress Provider</h3>
    <div class="flex flex-wrap gap-3">
      <SButton @click="start">Start</SButton>
      <SButton variant="outline" @click="set">Set 60%</SButton>
      <SButton variant="outline" color="destructive" @click="progress.done()">Done</SButton>
    </div>
  </div>
</template>
