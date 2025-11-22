<script setup lang="ts">
import { computed } from 'vue';
import { SIcon } from '@soybeanjs/ui';
import { useI18n } from 'vue-i18n';
import BackgroundDecoration from '@/motion/background-decoration.vue';

const { t } = useI18n();

const features = computed(() => [
  {
    title: t('components.home.features.accessible.title'),
    description: t('components.home.features.accessible.desc'),
    icon: 'lucide:accessibility',
    class: 'text-primary'
  },
  {
    title: t('components.home.features.headless.title'),
    description: t('components.home.features.headless.desc'),
    icon: 'lucide:code-xml',
    class: 'text-purple-500'
  },
  {
    title: t('components.home.features.type-safe.title'),
    description: t('components.home.features.type-safe.desc'),
    icon: 'lucide:file-type-2',
    class: 'text-blue-500'
  },
  {
    title: t('components.home.features.customizable.title'),
    description: t('components.home.features.customizable.desc'),
    icon: 'lucide:palette',
    class: 'text-pink-500'
  }
]);
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 relative font-sans"
  >
    <BackgroundDecoration />

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center max-w-5xl mx-auto">
        <div class="logo-float group relative z-20 mt-28 mb-4 lg:!mt-4">
          <div
            class="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <img
            src="/logo.svg"
            alt="Logo"
            class="size-28 md:size-36 mx-auto drop-shadow-2xl filter relative z-10 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div class="hero-content">
          <h1
            class="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary dark:from-primary dark:to-primary-300"
          >
            {{ t('components.home.title') }}
          </h1>
          <p
            class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {{ t('components.home.description') }}
          </p>
        </div>

        <div class="flex flex-wrap gap-6 justify-center mb-24">
          <SButtonLink to="/components/button" size="lg" variant="solid" shape="rounded" class="group w-45">
            {{ t('components.home.actions.start') }}
            <SIcon icon="lucide:arrow-right" class="group-hover:translate-x-1 transition-transform" />
          </SButtonLink>
          <SButtonLink
            href="https://github.com/soybeanjs/soybean-ui"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="pure"
            shape="rounded"
            class="group w-45"
          >
            <SIcon icon="lucide:github" class="group-hover:translate-x-1 transition-transform" />
            {{ t('components.home.actions.github') }}
          </SButtonLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            :style="{ animationDelay: `${index * 0.1 + 0.5}s` }"
            class="feature-card group bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-border shadow-lg shadow-gray-200/20 dark:shadow-none hover:bg-white/60 dark:hover:bg-white/10 hover:border-white/80 dark:hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
          >
            <div class="text-3xl mb-4 p-3 rounded-xl bg-gray-100 dark:bg-white/5 w-fit" :class="feature.class">
              <SIcon :icon="feature.icon" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Logo 上下浮动动画 */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.logo-float {
  animation: float 2s ease-in-out infinite;
}

/* 标题和描述淡入+向上移动动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-content {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* 特性卡片淡入+向上移动动画 */
@keyframes fadeInUpCard {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-card {
  animation: fadeInUpCard 0.5s ease-out forwards;
  opacity: 0;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
