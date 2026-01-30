<script setup lang="ts">
import type { Component } from 'vue';

interface Props {
  /**
   * The path to the markdown file
   *
   * @example 'components/button', 'quick-start'
   */
  path: string;
}

const props = defineProps<Props>();

interface Emits {
  /**
   * Emitted when the markdown file is loaded
   * The parameter indicates whether the loading was successful
   */
  loaded: [isSuccess: boolean];
}

const emit = defineEmits<Emits>();

const { locale } = useI18n();

const mdModules = import.meta.glob<{ default: Component }>('./**/*.md', { base: '/src/docs' });

const cp = shallowRef<Component | null>(null);

async function loadDoc() {
  let path = props.path;
  if (path.startsWith('/')) {
    path = path.slice(1);
  }
  if (path.endsWith('.md')) {
    path = path.slice(0, -3);
  }

  const key = `./${locale.value}/${path}.md`;
  const load = mdModules[key];

  let isSuccess = false;

  if (load) {
    const mod = await load();
    cp.value = mod.default;
    isSuccess = true;
  }
  emit('loaded', isSuccess);
}

watchEffect(() => {
  loadDoc();
});
</script>

<template>
  <component :is="cp" v-if="cp" />
</template>
