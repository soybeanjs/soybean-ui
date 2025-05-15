<script setup lang="ts">
import { type Component, defineAsyncComponent, shallowRef, watchEffect } from 'vue';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader?: () => Promise<Record<string, any>>; // Accept any for module exports
}
const props = defineProps<Props>();

const demos = shallowRef<Record<string, Component> | null>(null);
const error = shallowRef<any>(null);
const isLoading = shallowRef(true);

watchEffect(async () => {
  if (props.loader) {
    isLoading.value = true;
    error.value = null;
    demos.value = null;
    try {
      const loadedModule = await props.loader();
      const resolvedComponents: Record<string, Component> = {};

      for (const key in loadedModule) {
        // Check if it's a component or an async component loader
        if (typeof loadedModule[key] === 'function' || typeof loadedModule[key] === 'object') {
          // Standardize to async component for consistent handling
          resolvedComponents[key] = defineAsyncComponent(async () => loadedModule[key]);
        }
      }

      const sortedEntries = Object.entries(resolvedComponents).sort(([keyA], [keyB]) => {
        const isDebugA = keyA.toLowerCase().includes('debug');
        const isDebugB = keyB.toLowerCase().includes('debug');
        if (isDebugA && !isDebugB) return -1;
        if (!isDebugA && isDebugB) return 1;
        return keyA.localeCompare(keyB);
      });
      demos.value = Object.fromEntries(sortedEntries);
    } catch (e) {
      console.error('Failed to load or process demos:', e);
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  }
});

function formatDemoName(name: string): string {
  // Remove 'Demo' suffix if present
  let formattedName = name.endsWith('Demo') ? name.slice(0, -4) : name;
  // Add spaces before capital letters for readability, but not if it's the first letter
  formattedName = formattedName.replace(/([A-Z])/g, ' $1').trim();
  // Capitalize first letter
  return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
}
</script>

<template>
  <div v-if="isLoading" class="h-32 flex items-center justify-center">
    <p class="text-gray-500 dark:text-gray-400">Loading demos...</p>
  </div>
  <div v-else-if="error" class="border border-red-400 rounded bg-red-100 p-4 text-red-700">
    <p class="font-semibold">Error loading demos:</p>
    <pre class="whitespace-pre-wrap text-sm">{{ error.message || error }}</pre>
    <p class="mt-2 text-xs">Check the browser console for more details.</p>
  </div>
  <div v-else-if="demos && Object.keys(demos).length > 0">
    <div
      v-for="(comp, name) in demos"
      :key="name"
      class="mb-8 border border-gray-200 rounded-xl bg-white p-6 shadow-lg transition-all dark:border-neutral-700 dark:bg-neutral-800 hover:shadow-xl"
    >
      <h3
        class="mb-4 border-b border-gray-200 pb-2 text-xl text-gray-800 font-bold dark:border-neutral-700 dark:text-gray-100"
      >
        {{ formatDemoName(name) }}
      </h3>
      <component :is="comp" />
    </div>
  </div>
  <div v-else class="h-32 flex items-center justify-center">
    <p class="text-gray-500 dark:text-gray-400">No demos found for this component.</p>
  </div>
</template>
