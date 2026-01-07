<script setup lang="ts">
import { shallowRef } from 'vue';

const visible = shallowRef(false);

const closeDrawer = () => {
  visible.value = false;
};
</script>

<template>
  <div class="[--app-header:3.75rem] min-h-full pt-[--app-header] text-sm">
    <AppHeader />
    <div class="lt-md:!hidden fixed top-[--app-header] left-0 w-50 h-[calc(100vh-var(--app-header))]">
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
    <div class="lt-md:ml-0 lt-2xl:ml-50 p-6 lt-md:pt-12!">
      <RouterView />
    </div>
  </div>
</template>
