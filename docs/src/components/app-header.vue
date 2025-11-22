<script setup lang="ts">
import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import pkg from '../../package.json' with { type: 'json' };
import ToolBar from './tool-bar.vue';

const { t } = useI18n();

const drawerVisible = shallowRef(false);
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 h-[--app-header] bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300"
  >
    <div class="flex items-center justify-between px-6 py-3 max-w-[1440px] mx-auto h-full">
      <div class="flex items-center gap-8">
        <SLink to="/" class="group flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" class="size-8 transition-transform duration-300 group-hover:scale-110" />
          <h1
            class="text-lg font-bold bg-clip-text text-transparent whitespace-nowrap bg-gradient-to-r from-primary-600 to-primary dark:from-primary dark:to-primary-300"
          >
            {{ t('components.home.title') }}
          </h1>
        </SLink>
        <SearchDocument class="lt-md:!hidden [&_.placeholder]:lt-lg:hidden" />
      </div>

      <div class="flex items-center gap-4">
        <HeaderNav class="lt-md:!hidden" />
        <STag size="lg" variant="soft" color="carbon" shape="rounded" class="lt-md:!hidden">v{{ pkg.version }}</STag>
        <SSeparator orientation="vertical" class="h-8 lt-md:!hidden" />
        <ToolBar class="lt-md:!hidden" />

        <!-- Mobile Drawer -->
        <SDrawer v-model:open="drawerVisible" placement="right">
          <template #trigger>
            <SButtonIcon icon="lucide:menu" class="md:!hidden text-xl" />
          </template>
          <div class="flex flex-col gap-4 pt-4">
            <SearchDocument data-mobile class="w-full" />
            <HeaderNav orientation="vertical" />
            <SSeparator />
            <ToolBar />
          </div>
        </SDrawer>
      </div>
    </div>
  </header>
</template>
