<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { SButton, SDrawer, SIcon } from '@soybeanjs/ui';
import { useI18n } from 'vue-i18n';
import pkg from '../../package.json' with { type: 'json' };
import ToolBar from './tool-bar.vue';

const router = useRouter();
const { t } = useI18n();
const drawerVisible = ref(false);

function goHome() {
  router.push('/');
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300"
  >
    <div class="flex items-center justify-between px-6 py-3 max-w-[1440px] mx-auto h-full">
      <!-- Left Section: Logo, Title, Search -->
      <div class="flex items-center gap-8">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3 cursor-pointer group" @click="goHome">
          <img src="/logo.svg" alt="Logo" class="size-8 transition-transform duration-300 group-hover:scale-110" />
          <h1
            class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary dark:from-primary dark:to-primary-300 hidden sm:block"
          >
            {{ t('components.home.title') }}
          </h1>
        </div>

        <!-- Search Box (Placeholder) -->
        <div
          class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-500 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-64"
        >
          <SIcon icon="lucide:search" class="text-base" />
          <span>{{ t('layout.header.search') }}</span>
          <span class="ml-auto text-xs border border-gray-300 dark:border-gray-600 rounded px-1">⌘K</span>
        </div>
      </div>

      <!-- Right Section: Menu, Version, Tools -->
      <div class="flex items-center gap-6">
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6">
          <a
            href="#"
            class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            {{ t('layout.header.docs') }}
          </a>
          <RouterLink
            to="/components/button"
            class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            active-class="text-primary dark:text-primary font-semibold"
          >
            {{ t('layout.header.components') }}
          </RouterLink>
        </nav>

        <!-- Version -->
        <div
          class="hidden md:block text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
        >
          {{ pkg.version }}
        </div>

        <!-- Tools -->
        <div class="hidden md:flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800">
          <a
            href="https://github.com/soybeanjs/soybean-ui"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <SIcon icon="mdi:github" class="text-xl" />
          </a>
          <ToolBar />
        </div>

        <!-- Mobile Menu Toggle -->
        <div class="md:!hidden flex items-center gap-2">
          <SButton variant="ghost" class="!p-2 size-9 rounded-full" @click="drawerVisible = true">
            <SIcon icon="lucide:menu" class="text-xl" />
          </SButton>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <SDrawer v-model:open="drawerVisible" placement="right" class="w-64 p-4">
      <div class="flex flex-col gap-6 mt-6">
        <!-- Mobile Search -->
        <div
          class="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-500 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <SIcon icon="lucide:search" class="text-base" />
          <span>{{ t('layout.header.search') }}</span>
        </div>

        <!-- Mobile Navigation -->
        <nav class="flex flex-col gap-4">
          <a
            href="#"
            class="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            {{ t('layout.header.docs') }}
          </a>
          <RouterLink
            to="/components/button"
            class="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            active-class="text-primary dark:text-primary font-semibold"
            @click="drawerVisible = false"
          >
            {{ t('layout.header.components') }}
          </RouterLink>
        </nav>

        <div class="h-px bg-gray-200 dark:bg-gray-800 my-2"></div>

        <!-- Mobile Tools -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500">{{ t('layout.header.version') }}</span>
            <span
              class="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
            >
              v0.0.1
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500">{{ t('layout.header.github') }}</span>
            <a
              href="https://github.com/soybeanjs/soybean-ui"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <SIcon icon="mdi:github" class="text-xl" />
            </a>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500">{{ t('layout.header.theme_language') }}</span>
            <ToolBar />
          </div>
        </div>
      </div>
    </SDrawer>
  </header>
</template>
