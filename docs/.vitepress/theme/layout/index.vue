<script setup lang="ts">
import { useData } from 'vitepress';
import { computed, toRefs } from 'vue';
import { useScroll, useStorage } from '@vueuse/core';
import { SButtonIcon, SConfigProvider, SPopover } from 'soy-ui';
import type { ConfigProviderProps, ThemeSize } from 'soy-ui';
import type { ThemeConfigColor } from '@soybean-ui/unocss-preset';
import { SwatchBook } from 'lucide-vue-next';
import ThemeCustomizer from './components/theme-customize.vue';
import AppLogo from './components/app-logo.vue';
import Home from './components/home.vue';
import Navbar from './components/navbar.vue';
import Docs from './components/docs.vue';

const { site, frontmatter } = useData();

const { arrivedState } = useScroll(globalThis.window);

const { top } = toRefs(arrivedState);

const color = useStorage<ThemeConfigColor>('color', 'default');
const radius = useStorage('radius', 0.5);
const size = useStorage<ThemeSize>('size', 'md');

const configProviderProps = computed<ConfigProviderProps>(() => ({
  theme: {
    color: color.value,
    radius: radius.value
  },
  size: size.value
}));
</script>

<template>
  <SConfigProvider v-bind="configProviderProps">
    <div class="flex-c items-center">
      <header
        class="sticky top-0 z-10 h-17 w-full py-4 transition-all duration-500"
        :class="[
          top
            ? 'bg-transparent backdrop-blur-0'
            : 'bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/90'
        ]"
      >
        <div class="mx-auto max-w-1440px flex-y-center justify-between px-6">
          <div class="w-full flex-y-center justify-between gap-8 md:justify-unset">
            <a href="/" class="flex-y-center gap-2">
              <AppLogo class="size-8 text-primary md:size-9" />
              <span class="text-xl font-bold md:text-2xl">{{ site.title }}</span>
            </a>
            <!-- <SearchTrigger /> -->
          </div>

          <Navbar>
            <template #theme-customize>
              <SPopover :ui="{ content: 'z-15' }" side="bottom" align="end">
                <template #trigger>
                  <SButtonIcon size="lg" class="mr-3">
                    <SwatchBook />
                  </SButtonIcon>
                </template>
                <ThemeCustomizer v-model:color="color" v-model:radius="radius" v-model:size="size" />
              </SPopover>
            </template>
          </Navbar>
        </div>
      </header>

      <div v-if="frontmatter.layout === 'home'" class="size-full flex-c flex-1 justify-between">
        <Home />
        <div></div>
      </div>

      <div v-else class="w-full flex-grow">
        <Docs />
      </div>
    </div>
  </SConfigProvider>
</template>
