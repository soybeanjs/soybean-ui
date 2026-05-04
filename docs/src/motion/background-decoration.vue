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

const particleTones: PrimaryTone[] = ['400', '500', '600', '700', '500', '600', '400', '700', '600', '500', '400'];

const particleSizes = ['w-1 h-1', 'w-1.5 h-1.5', 'w-2 h-2'];

const gridCols = 4;
const gridRows = 3;
const totalParticles = particleTones.length;

const particles = computed(() => {
  return Array.from({ length: totalParticles }, (_, index) => {
    const col = index % gridCols;
    const row = Math.floor(index / gridCols);

    // 计算均匀分布的位置（留出边距，避免太靠边）
    const leftPercent = 10 + col * (80 / (gridCols - 1));
    const topPercent = 10 + row * (80 / (gridRows - 1));

    const tone = particleTones[index % particleTones.length];
    const size = particleSizes[index % particleSizes.length];

    // 延迟时间（0-2000ms之间，每个粒子间隔约200ms）
    const delay = index * 200;

    return {
      background: resolvePrimaryTone(tone, 0.22),
      size,
      left: leftPercent,
      top: topPercent,
      delay
    };
  });
});
</script>

<template>
  <div class="bg-decoration absolute inset-0 overflow-hidden pointer-events-none select-none">
    <!-- Grid Background -->
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
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
    <div class="absolute inset-0 opacity-30 dark:opacity-20">
      <div
        v-for="(particle, index) in particles"
        :key="index"
        :style="{
          background: particle.background,
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          animationDelay: `${particle.delay}ms`
        }"
        class="absolute rounded-full animate-ping will-change-transform"
        :class="particle.size"
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
