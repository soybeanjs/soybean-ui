<script setup lang="ts">
import { useDocOutline } from '@/composables/use-doc-outline';

const visible = shallowRef(false);
const docOutline = useDocOutline();
const route = useRoute();
const hasDocOutline = computed(() => docOutline.value.length > 0);
const shouldReserveOutlineSpace = computed(() => route.path !== '/');

const closeDrawer = () => {
  visible.value = false;
};
</script>

<template>
  <div
    class="[--app-header-main:3.75rem] [--app-topbar:0rem] md:[--app-topbar:2.75rem] [--app-header:calc(var(--app-header-main)+var(--app-topbar))] min-h-full pt-[--app-header] text-sm"
  >
    <AppHeader />
    <div class="lt-md:!hidden fixed top-[--app-header] left-0 z-49 w-50 h-[calc(100vh-var(--app-header))] bg-sidebar">
      <SiderMenu />
    </div>
    <div
      class="md:hidden fixed top-[--app-header] left-0 right-0 z-50 pl-2 py-1 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50"
    >
      <SDrawer v-model:open="visible" side="left">
        <template #trigger>
          <SButtonIcon icon="lucide:menu" class="text-lg" />
        </template>
        <SiderMenu @select="closeDrawer" />
      </SDrawer>
    </div>
    <div class="lt-md:ml-0 md:ml-50 px-4 py-5 md:px-8 md:py-7 xl:px-10 lt-md:pt-12!">
      <div
        class="mx-auto min-w-0"
        :class="shouldReserveOutlineSpace ? 'xl:grid xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start xl:gap-8' : ''"
      >
        <div class="min-w-0">
          <RouterView />
        </div>

        <aside v-if="shouldReserveOutlineSpace" class="lt-xl:hidden xl:w-72 xl:min-w-0">
          <div
            class="fixed top-[calc(var(--app-header)+1.5rem)] right-8 z-40 w-72 transition-opacity duration-200"
            :class="hasDocOutline ? 'opacity-100' : 'pointer-events-none opacity-0'"
          >
            <div
              class="max-h-[calc(100vh-var(--app-header)-2.5rem)] overflow-auto rounded-6 border border-border/60 bg-background/82 p-3 shadow-[0_16px_44px_-32px_rgba(15,23,42,0.2)] backdrop-blur-md"
            >
              <SAnchor :items="docOutline" size="sm" :offset-top="132" :target-offset="132" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
