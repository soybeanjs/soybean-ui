<script setup lang="ts">
import { computed } from 'vue';

const orbs = [
  {
    size: 'w-[500px] h-[500px]',
    color: 'bg-blue-400/20 dark:bg-blue-600/20'
  },
  {
    size: 'w-[400px] h-[400px]',
    color: 'bg-purple-400/20 dark:bg-purple-600/20'
  },
  {
    size: 'w-[300px] h-[300px]',
    color: 'bg-cyan-400/20 dark:bg-cyan-600/20'
  }
];

// Tech Particles 配置
const particleColors = [
  'bg-primary',
  'bg-purple-500',
  'bg-cyan-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-emerald-500'
];

const particleSizes = ['w-1 h-1', 'w-1.5 h-1.5', 'w-2 h-2'];

// 生成9个粒子，使用3x3网格均匀分布
const gridCols = 3;
const gridRows = 3;
const totalParticles = gridCols * gridRows;

const particles = computed(() => {
  return Array.from({ length: totalParticles }, (_, index) => {
    const col = index % gridCols;
    const row = Math.floor(index / gridCols);

    // 计算均匀分布的位置（留出边距，避免太靠边）
    const leftPercent = 10 + col * (80 / (gridCols - 1));
    const topPercent = 10 + row * (80 / (gridRows - 1));

    // 随机选择颜色和大小
    const color = particleColors[index % particleColors.length];
    const size = particleSizes[index % particleSizes.length];

    // 延迟时间（0-2000ms之间，每个粒子间隔约200ms）
    const delay = index * 200;

    return {
      color,
      size,
      left: leftPercent,
      top: topPercent,
      delay
    };
  });
});
</script>

<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none select-none">
    <!-- Grid Background -->
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
    />

    <!-- Floating Orbs -->
    <div
      v-for="(orb, index) in orbs"
      :key="index"
      class="absolute rounded-full blur-[100px]"
      :class="[orb.size, orb.color]"
      :style="{
        left: `${(index + 1) * 20}%`,
        top: `${(index + 1) * 10}%`
      }"
    />

    <!-- Tech Particles / Accents -->
    <div class="absolute inset-0 opacity-30 dark:opacity-50">
      <div
        v-for="(particle, index) in particles"
        :key="index"
        :style="{
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          animationDelay: `${particle.delay}ms`
        }"
        class="absolute rounded-full animate-ping"
        :class="[particle.color, particle.size]"
      />
    </div>
  </div>
</template>
