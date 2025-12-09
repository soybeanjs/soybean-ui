<script setup lang="ts">
import { computed, shallowRef, watchEffect } from 'vue';
import type { Component } from 'vue';
import { pascalCase } from 'es-toolkit';

const route = useRoute('/components/[name]');

const { t, locale } = useI18n();

const name = computed(() => route.params.name);

const alertTitle = computed(() => t('not-found-component-doc', { name: pascalCase(name.value) }));

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

  docComp.value = null;
}

watchEffect(() => {
  loadDoc();
});
</script>

<template>
  <div>
    <component :is="docComp" v-if="docComp" />
    <SAlert v-else color="destructive" :title="alertTitle" icon="lucide:alert-circle" class="w-fit" />
  </div>
</template>
