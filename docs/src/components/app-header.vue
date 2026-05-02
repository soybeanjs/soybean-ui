<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import pkg from '../../package.json' with { type: 'json' };
import ToolBar from './tool-bar.vue';

const { t } = useI18n();
const route = useRoute();
const isScrolled = shallowRef(false);
let bodyObserver: MutationObserver | null = null;

const { version } = pkg;
const showTopBar = computed(() => route.path !== '/');

function getScrollOffset() {
  if (document.body.hasAttribute('data-scroll-lock')) {
    const top = Number.parseFloat(document.body.style.top || '0');

    return Number.isNaN(top) ? 0 : Math.abs(top);
  }

  return window.scrollY;
}

function syncScrollState() {
  isScrolled.value = getScrollOffset() > 24;
}

onMounted(() => {
  syncScrollState();
  window.addEventListener('scroll', syncScrollState, { passive: true });
  bodyObserver = new MutationObserver(syncScrollState);
  bodyObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['style', 'data-scroll-lock']
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', syncScrollState);
  bodyObserver?.disconnect();
  bodyObserver = null;
});
</script>

<template>
  <header
    :data-scrolled="isScrolled"
    class="docs-header-shell fixed top-0 left-0 right-0 z-49 px-4 transition-all duration-300 sm:px-6"
  >
    <div class="docs-header-frame mx-auto flex max-w-360 items-center justify-between gap-3 px-6 py-3 xl:gap-4">
      <div class="flex min-w-0 items-center gap-4 lg:gap-6 xl:gap-8">
        <SLink to="/" class="group flex items-center gap-3">
          <AppLogo class="size-8 transition-transform duration-300 group-hover:scale-110" />
          <h1
            class="text-lg font-bold bg-clip-text text-transparent whitespace-nowrap bg-gradient-to-r from-primary-600 to-primary dark:from-primary dark:to-primary-300"
          >
            {{ t('components.home.title') }}
          </h1>
        </SLink>
        <SearchDocument class="lt-xl:!hidden [&_.placeholder]:lt-2xl:hidden" />
      </div>

      <div class="flex items-center gap-3 xl:gap-4">
        <HeaderNav v-if="!showTopBar" class="lt-xl:!hidden" />
        <STag size="lg" variant="soft" color="carbon" shape="rounded" class="lt-xl:!hidden">v{{ version }}</STag>
        <SSeparator orientation="vertical" class="h-8 lt-xl:!hidden" />
        <ToolBar class="lt-xl:!hidden" />

        <SPopover placement="bottom-end">
          <template #trigger>
            <SButtonIcon icon="lucide:menu" class="xl:!hidden text-xl" />
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
  </header>

  <div
    v-if="showTopBar"
    :data-scrolled="isScrolled"
    class="docs-topbar-shell lt-md:hidden fixed left-0 right-0 z-48 px-4 sm:px-6"
  >
    <div class="mx-auto max-w-360 px-6">
      <div class="docs-topbar-frame flex h-[--app-topbar] items-center">
        <TopBar class="min-w-0 flex-1" />
      </div>
    </div>
  </div>
</template>
