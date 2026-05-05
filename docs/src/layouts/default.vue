<script setup lang="ts">
import { useDocOutline } from '@/composables/use-doc-outline';

const visible = shallowRef(false);
const docOutline = useDocOutline();
const route = useRoute();
const hasDocOutline = computed(() => docOutline.value.length > 0);
const shouldReserveOutlineSpace = computed(() => !['/', '/releases'].includes(route.path));
const shouldShowSidebar = computed(() => route.path.startsWith('/overview') || route.path.startsWith('/components'));

const mobileSidebarDrawerUi = {
  overlay: 'docs-mobile-sidebar-overlay',
  popup: 'docs-mobile-sidebar-popup',
  content: 'min-h-0'
} as const;

const closeDrawer = () => {
  visible.value = false;
};
</script>

<template>
  <div
    class="[--app-header-main:3.75rem] [--app-topbar:0rem] md:[--app-topbar:2.75rem] [--app-header:calc(var(--app-header-main)+var(--app-topbar))] min-h-full pt-[--app-header] text-sm"
  >
    <AppHeader />
    <div
      v-if="shouldShowSidebar"
      class="lt-md:!hidden fixed top-[calc(var(--app-header)+0.5rem)] left-0 z-49 w-55 h-[calc(100vh-var(--app-header)-0.5rem)] p-3"
    >
      <SiderMenu />
    </div>
    <div
      v-if="shouldShowSidebar"
      class="md:hidden fixed top-[calc(var(--app-header)+0.5rem)] left-0 right-0 z-50 pl-2 py-1"
    >
      <SDrawer v-model:open="visible" side="left" :ui="mobileSidebarDrawerUi">
        <template #trigger>
          <SButtonIcon icon="lucide:menu" class="text-lg" />
        </template>
        <SiderMenu @select="closeDrawer" />
      </SDrawer>
    </div>
    <div
      :class="shouldShowSidebar ? 'lt-md:ml-0 md:ml-55' : 'ml-0'"
      class="px-4 py-5 md:px-8 md:pb-7 md:pt-5 xl:px-10 lt-md:pt-12!"
    >
      <div
        class="mx-auto min-w-0"
        :class="shouldReserveOutlineSpace ? 'xl:grid xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start xl:gap-8' : ''"
      >
        <div class="min-w-0">
          <RouterView />
        </div>

        <aside v-if="shouldReserveOutlineSpace" class="lt-xl:hidden xl:w-72 xl:min-w-0">
          <div
            class="fixed top-[calc(var(--app-header)+1.25rem)] right-8 z-40 w-72 transition-opacity duration-200"
            :class="hasDocOutline ? 'opacity-100' : 'pointer-events-none opacity-0'"
          >
            <div
              class="max-h-[calc(100vh-var(--app-header)-2.5rem)] overflow-auto border border-border/50 dark:border-border p-3 rounded-xl"
            >
              <SAnchor :items="docOutline" size="sm" :offset-top="124" :target-offset="124" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
