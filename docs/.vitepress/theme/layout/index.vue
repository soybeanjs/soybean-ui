<script setup lang="ts">
import { toRefs } from 'vue';
import { useData } from 'vitepress';
import { useScroll } from '@vueuse/core';
import Home from './components/home.vue';
import Navbar from './components/navbar.vue';

const { site, theme, frontmatter } = useData();

const { arrivedState } = useScroll(globalThis.window);
const { top } = toRefs(arrivedState);
</script>

<template>
  <div class="h-full flex-col items-center">
    <header
      class="sticky top-0 z-10 h-68px w-full py-4 transition-all duration-500"
      :class="[
        top
          ? 'bg-transparent backdrop-blur-0'
          : 'bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/90'
      ]"
    >
      <div class="mx-auto max-w-1440px flex-y-center justify-between px-6">
        <div class="w-full flex-y-center justify-between gap-8 md:justify-unset">
          <a href="/" class="flex-y-center gap-2">
            <img class="w-8 md:w-9" alt="Soybean UI logo" :src="theme.logo" />
            <span class="text-xl font-bold md:text-2xl">{{ site.title }}</span>
          </a>
          <!-- <SearchTrigger /> -->
        </div>

        <Navbar />
      </div>
    </header>

    <div v-if="frontmatter.layout === 'home'" class="size-full flex-col flex-1 justify-between">
      <Home />
      <div></div>
    </div>

    <div v-else class="size-full max-w-1440px flex-grow">
      <!-- <Docs /> -->
    </div>
  </div>
</template>

<style scoped></style>
