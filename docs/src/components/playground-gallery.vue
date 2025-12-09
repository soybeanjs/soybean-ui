<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import type { Component } from 'vue';
import { SAlert } from '@soybeanjs/ui';
import { useI18n } from 'vue-i18n';

interface Props {
  component: string;
  files: string[];
}

const props = defineProps<Props>();

const { t } = useI18n();

const playgroundModules = import.meta.glob<{ default: Component }>('@playground/examples/**/*.vue');

const components = computed(() => {
  return props.files.map(file => {
    const key = `../playground/examples/${props.component}/${file}.vue`;
    const loader = playgroundModules[key];
    return loader ? defineAsyncComponent(loader) : null;
  });
});
</script>

<template>
  <div class="space-y-4">
    <template v-for="(file, index) in files" :key="index">
      <component :is="components[index]" v-if="components[index]" />
      <SAlert v-else color="destructive" :title="`${component}/${file} ${t('not-found')}`" icon="lucide:alert-circle" />
    </template>
  </div>
</template>
