<script setup lang="ts">
import { computed, shallowRef, watchEffect } from 'vue';
import type { Component } from 'vue';

const router = useRouter();
const route = useRoute('/components/[name]');

const { locale } = useI18n();

const name = computed(() => route.params.name);

const mdModules = import.meta.glob<{ default: Component }>('/src/docs/**/*.md');

const docComp = shallowRef<Component | null>(null);

async function loadDoc() {
  const key = `/src/docs/${locale.value}/${name.value}.md`;
  const load = mdModules[key];
  if (load) {
    const mod = await load();
    docComp.value = mod.default;

    return;
  }

  router.replace('/404');
}

watchEffect(() => {
  loadDoc();
});
</script>

<template>
  <component :is="docComp" v-if="docComp" />
</template>
