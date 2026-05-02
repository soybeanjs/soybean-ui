<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import pkg from '../../package.json' with { type: 'json' };
import ToolBar from './tool-bar.vue';

const { t } = useI18n();
const route = useRoute();

const { version } = pkg;
const showTopBar = computed(() => route.path !== '/');
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-49 h-[--app-header] backdrop-blur-md border-b border-border transition-all duration-300"
  >
    <div class="mx-auto flex h-full max-w-360 flex-col px-6">
      <div class="flex h-[--app-header-main] items-center justify-between gap-4 py-3">
        <div class="flex min-w-0 items-center gap-8">
          <SLink to="/" class="group flex items-center gap-3">
            <AppLogo class="size-8 transition-transform duration-300 group-hover:scale-110" />
            <h1
              class="text-lg font-bold bg-clip-text text-transparent whitespace-nowrap bg-gradient-to-r from-primary-600 to-primary dark:from-primary dark:to-primary-300"
            >
              {{ t('components.home.title') }}
            </h1>
          </SLink>
          <SearchDocument class="lt-md:!hidden [&_.placeholder]:lt-lg:hidden" />
        </div>

        <div class="flex items-center gap-4">
          <HeaderNav v-if="!showTopBar" class="lt-md:!hidden" />
          <STag size="lg" variant="soft" color="carbon" shape="rounded" class="lt-md:!hidden">v{{ version }}</STag>
          <SSeparator orientation="vertical" class="h-8 lt-md:!hidden" />
          <ToolBar class="lt-md:!hidden" />

          <SPopover placement="bottom-end">
            <template #trigger>
              <SButtonIcon icon="lucide:menu" class="md:!hidden text-xl" />
            </template>
            <div class="flex flex-col gap-4 pt-4">
              <SearchDocument data-mobile class="w-full" />
              <HeaderNav orientation="vertical" />
              <SSeparator />
              <ToolBar />
            </div>
          </SPopover>
        </div>
      </div>

      <div v-if="showTopBar" class="lt-md:hidden flex h-[--app-topbar] items-center border-t border-border/60">
        <TopBar class="min-w-0 flex-1" />
      </div>
    </div>
  </header>
</template>
