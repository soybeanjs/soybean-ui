<script setup lang="ts">
import { Motion } from 'motion-v';

const orbs = [
  {
    size: 'w-[500px] h-[500px]',
    color: 'bg-blue-400/20 dark:bg-blue-600/20',
    initial: { x: -100, y: -100 },
    animate: {
      x: [0, 100, -50, 0],
      y: [0, -50, 100, 0],
      scale: [1, 1.2, 0.9, 1]
    },
    duration: 20
  },
  {
    size: 'w-[400px] h-[400px]',
    color: 'bg-purple-400/20 dark:bg-purple-600/20',
    initial: { x: 400, y: 200 },
    animate: {
      x: [0, -100, 50, 0],
      y: [0, 100, -50, 0],
      scale: [1, 0.8, 1.1, 1]
    },
    duration: 25
  },
  {
    size: 'w-[300px] h-[300px]',
    color: 'bg-cyan-400/20 dark:bg-cyan-600/20',
    initial: { x: 100, y: 400 },
    animate: {
      x: [0, 50, -100, 0],
      y: [0, -100, 50, 0],
      scale: [1, 1.1, 0.9, 1]
    },
    duration: 18
  }
];
</script>

<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none select-none">
    <!-- Grid Background -->
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
    />

    <!-- Floating Orbs -->
    <Motion
      v-for="(orb, index) in orbs"
      :key="index"
      :initial="orb.initial"
      :animate="orb.animate"
      :transition="{
        duration: orb.duration,
        repeat: Infinity,
        ease: 'linear'
      }"
      class="absolute rounded-full blur-[100px]"
      :class="[orb.size, orb.color]"
      :style="{
        left: `${(index + 1) * 20}%`,
        top: `${(index + 1) * 10}%`
      }"
    />

    <!-- Tech Particles / Accents -->
    <div class="absolute inset-0 opacity-30 dark:opacity-50">
      <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" />
      <div class="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping delay-700" />
      <div class="absolute bottom-1/4 left-1/2 w-1 h-1 bg-cyan-500 rounded-full animate-ping delay-1000" />
    </div>
  </div>
</template>
