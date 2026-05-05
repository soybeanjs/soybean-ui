<script setup lang="ts">
type PrimaryTone = 'primary' | '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';

function resolvePrimaryTone(tone: PrimaryTone, alpha: number) {
  const variable = tone === 'primary' ? '--primary' : `--primary-${tone}`;

  return `hsl(var(${variable}) / ${alpha})`;
}

const orbs = [
  {
    size: 'w-[500px] h-[500px]',
    color: resolvePrimaryTone('400', 0.06)
  },
  {
    size: 'w-[400px] h-[400px]',
    color: resolvePrimaryTone('500', 0.055)
  },
  {
    size: 'w-[300px] h-[300px]',
    color: resolvePrimaryTone('700', 0.05)
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

const particleSizes = ['w-2 h-2', 'w-2.5 h-2.5', 'w-3 h-3'];

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
  <div class="bg-decoration fixed inset-0 overflow-hidden pointer-events-none select-none">
    <!-- Grid Background -->
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
    />

    <!-- Floating Orbs -->

    <div
      v-for="(orb, index) in orbs"
      :key="index"
      class="absolute rounded-full blur-[100px] will-change-transform"
      :class="orb.size"
      :style="{
        background: orb.color,
        left: `${(index + 1) * 20}%`,
        top: `${(index + 1) * 10}%`
      }"
    />

    <!-- Tech Particles / Accents -->
    <div class="absolute inset-0 opacity-55 dark:opacity-40">
      <div
        v-for="(particle, index) in particles"
        :key="index"
        :style="{
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          animationDelay: `${particle.delay}ms`
        }"
        class="absolute rounded-full animate-ping will-change-transform"
        :class="[particle.size, particle.color]"
      />
    </div>
  </div>
</template>

<style scoped>
.bg-decoration {
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 移动端优化：减少初始渲染闪烁 */
@media (max-width: 768px) {
  .bg-decoration {
    animation: fadeIn 0.5s ease-out forwards;
    will-change: opacity;
  }
}
</style>
