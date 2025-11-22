<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';
import { SIcon } from '@soybeanjs/ui';
import { useI18n } from 'vue-i18n';
import { Motion } from 'motion-v';
import BackgroundDecoration from '@/motion/background-decoration.vue';

const router = useRouter();
const { t } = useI18n();
const isDark = useDark();

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

function getDelay(index: number) {
  return {
    delay: index * 0.1 + 0.5,
    duration: 0.5,
    ease: 'easeOut' as const
  };
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 relative font-sans"
  >
    <BackgroundDecoration />

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center max-w-5xl mx-auto">
        <Motion
          :initial="{ opacity: 0, scale: 0.5 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.8, ease: 'easeOut' }"
          class="lg:!mt-4 mt-28 mb-4 inline-block relative z-20"
        >
          <Motion :animate="{ y: [0, -20, 0] }" :transition="{ duration: 2, repeat: Infinity, ease: 'easeInOut' }">
            <div class="group relative">
              <div
                class="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <img
                src="/logo.svg"
                alt="Logo"
                class="size-28 md:size-36 mx-auto drop-shadow-2xl filter relative z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Motion>
        </Motion>

        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, ease: 'easeOut' }"
        >
          <h1
            class="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary dark:from-primary dark:to-primary-300"
          >
            {{ t('components.home.title') }}
          </h1>
        </Motion>

        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
        >
          <p
            class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {{ t('components.home.description') }}
          </p>
        </Motion>

        <Motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.5, delay: 0.4 }"
          class="flex flex-wrap gap-6 justify-center mb-24"
        >
          <button
            class="group flex-center gap-2 w-45 px-4 py-2 rounded-full text-center bg-primary text-white font-semibold text-lg hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary/30 active:scale-95 flex items-center"
            @click="router.push('/components/button')"
          >
            {{ t('components.home.actions.start') }}
            <SIcon icon="lucide:arrow-right" class="group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="https://github.com/soybeanjs/soybean-ui"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-center gap-2 w-45 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
          >
            <SIcon :icon="isDark ? 'skill-icons:github-light' : 'skill-icons:github-dark'" />
            {{ t('components.home.actions.github') }}
          </a>
        </Motion>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <Motion
            v-for="(feature, index) in features"
            :key="feature.title"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="getDelay(index)"
            class="group bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-border shadow-lg shadow-gray-200/20 dark:shadow-none hover:bg-white/60 dark:hover:bg-white/10 hover:border-white/80 dark:hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
          >
            <div class="text-3xl mb-4 p-3 rounded-xl bg-gray-50 dark:bg-white/5 w-fit" :class="feature.class">
              <SIcon :icon="feature.icon" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ feature.description }}</p>
          </Motion>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
