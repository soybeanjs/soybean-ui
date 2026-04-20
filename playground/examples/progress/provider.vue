<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { SButton, progress } from '@soybeanjs/ui';

const SET_DURATION = 480;
let stopTimer: ReturnType<typeof setTimeout> | undefined;

function clearStopTimer() {
  if (!stopTimer) {
    return;
  }

  clearTimeout(stopTimer);
  stopTimer = undefined;
}

function start() {
  progress.reset();
  progress.start();

  clearStopTimer();
  stopTimer = setTimeout(() => {
    stopTimer = undefined;
    progress.done();
  }, 1000);
}

function stop() {
  clearStopTimer();
  progress.done();
}

function increment() {
  progress.inc(0.12);
}

function set() {
  progress.animate(0.6, {
    duration: SET_DURATION,
    easing: 'ease-in-out'
  });
}

onBeforeUnmount(() => {
  clearStopTimer();
  progress.reset();
});
</script>

<template>
  <div>
    <h3 class="playground-title">Progress API</h3>
    <div class="flex flex-wrap gap-3">
      <SButton @click="start">Start</SButton>
      <SButton variant="outline" @click="stop">Stop</SButton>
      <SButton variant="outline" @click="increment">Increment</SButton>
      <SButton variant="outline" @click="set">Set 60%</SButton>
    </div>
  </div>
</template>
