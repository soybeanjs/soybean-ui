<script setup lang="ts">
import { computed, shallowRef, watchEffect } from 'vue';
import type { Component } from 'vue';

const route = useRoute('/components/[name]');

const name = computed(() => route.params.name);

const mdModules = import.meta.glob<{ default: Component }>('/src/docs/**/index.md');

const docComp = shallowRef<Component | null>(null);

async function loadDoc() {
  const candidates = [`/src/docs/${name.value}/index.md`];
  const match = candidates.find(p => mdModules[p]);
  if (match) {
    const load = mdModules[match]!;
    const mod = await load();
    docComp.value = mod.default;
    return;
  }

  docComp.value = null;
}

watchEffect(() => {
  loadDoc();
});
</script>

<template>
  <div>
    <component :is="docComp" v-if="docComp" />
    <div v-else class="text-center text-sm text-red-6">该组件文档未找到：{{ name }}</div>
  </div>
</template>
