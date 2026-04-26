<script setup lang="ts">
import { useDocOutline } from '@/composables/use-doc-outline';

const visible = shallowRef(false);
const docOutline = useDocOutline();

const closeDrawer = () => {
  visible.value = false;
};
</script>

<template>
  <div class="[--app-header:3.75rem] min-h-full pt-[--app-header] text-sm">
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
    <div class="lt-md:ml-0 lt-2xl:ml-50 px-6 py-6 lt-md:pt-12! lt-md:!pr-6">
      <div class="min-w-0">
        <RouterView />
      </div>

      <aside v-if="docOutline.length" class="fixed top-[calc(var(--app-header)+1.5rem)] right-6 z-40 w-64 lt-md:hidden">
        <div
          class="max-h-[calc(100vh-var(--app-header)-2rem)] overflow-auto rounded-lg bg-background/80 backdrop-blur-sm"
        >
          <SAnchor :items="docOutline" size="sm" :offset-top="84" :target-offset="84" />
        </div>
      </aside>
    </div>
  </div>
</template>
