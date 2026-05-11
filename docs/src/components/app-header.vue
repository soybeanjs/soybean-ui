<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import pkg from '../../package.json' with { type: 'json' };
import ToolBar from './tool-bar.vue';

const { t } = useI18n();
const route = useRoute();
const isScrolled = shallowRef(false);
let bodyObserver: MutationObserver | null = null;
let viewport: VisualViewport | null = null;

const { version } = pkg;
const showTopBar = computed(() => route.path !== '/');

function readWindowScrollOffset() {
  return (
    window.scrollY ||
    window.pageYOffset ||
    document.scrollingElement?.scrollTop ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

function getScrollOffset() {
  if (document.body.hasAttribute('data-scroll-lock')) {
    const top = Number.parseFloat(document.body.style.top || '0');

    if (!Number.isNaN(top) && top !== 0) {
      return Math.abs(top);
    }
  }

  return readWindowScrollOffset();
}

function syncScrollState() {
  isScrolled.value = getScrollOffset() > 24;
}

onMounted(() => {
  viewport = window.visualViewport;
  syncScrollState();
  requestAnimationFrame(syncScrollState);
  window.addEventListener('scroll', syncScrollState, { passive: true });
  document.addEventListener('scroll', syncScrollState, { passive: true });
  window.addEventListener('resize', syncScrollState, { passive: true });
  window.addEventListener('pageshow', syncScrollState);
  viewport?.addEventListener('scroll', syncScrollState, { passive: true });
  viewport?.addEventListener('resize', syncScrollState, { passive: true });
  bodyObserver = new MutationObserver(syncScrollState);
  bodyObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['style', 'data-scroll-lock']
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', syncScrollState);
  document.removeEventListener('scroll', syncScrollState);
  window.removeEventListener('resize', syncScrollState);
  window.removeEventListener('pageshow', syncScrollState);
  viewport?.removeEventListener('scroll', syncScrollState);
  viewport?.removeEventListener('resize', syncScrollState);
  bodyObserver?.disconnect();
  bodyObserver = null;
  viewport = null;
});
</script>

<template>
  <header
    :data-scrolled="isScrolled"
    class="docs-header-shell group fixed top-0 start-0 end-0 z-49 px-4 transition-all-800 data-[scrolled=true]:top-3 sm:px-6"
  >
    <div
      class="docs-header-frame mx-auto flex max-w-360 min-h-[--app-header-main] items-center justify-between gap-3 px-6 py-3 group-data-[scrolled=true]:min-h-0 lt-md:group-data-[scrolled=true]:py-2 transition-all-300 xl:gap-4"
    >
      <div class="flex min-w-0 items-center gap-4 lg:gap-6 xl:gap-8">
        <SLink to="/" class="group flex items-center gap-3">
          <AppLogo class="size-8 transition-transform duration-300 group-hover:scale-110" />
          <h1
            class="text-lg font-bold bg-clip-text text-transparent whitespace-nowrap bg-gradient-to-r from-primary-600 to-primary dark:from-primary dark:to-primary-300"
          >
            {{ t('components.home.title') }}
          </h1>
        </SLink>
        <SearchDocument />
      </div>

      <div class="flex items-center gap-3 xl:gap-4">
        <HeaderNav v-if="!showTopBar" class="lt-xl:!hidden" />
        <STag size="lg" variant="soft" color="carbon" shape="rounded" class="lt-xl:!hidden">v{{ version }}</STag>
        <SSeparator orientation="vertical" class="h-8 lt-xl:!hidden" />
        <ToolBar class="lt-xl:!hidden" />

        <SPopover :modal="false" placement="bottom-end">
          <template #trigger>
            <SButtonIcon icon="lucide:menu" class="xl:!hidden text-xl" />
          </template>
          <div class="flex flex-col gap-4 pt-4">
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
    class="docs-topbar-shell fixed start-0 end-0 top-[--app-header-main] data-[scrolled=true]:top-[calc(var(--app-header-main)+0.5rem)] border border-border/50 data-[scrolled=true]:border-transparent dark:border-border z-48 transition-all-800 px-6 lt-md:hidden lt-sm:px-4"
  >
    <div class="mx-auto max-w-360 px-6">
      <div class="docs-topbar-frame flex h-[--app-topbar] items-center px-4">
        <TopBar class="min-w-0 flex-1" />
      </div>
    </div>
  </div>
</template>
