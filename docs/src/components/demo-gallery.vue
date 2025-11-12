<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import type { Component } from 'vue';

interface Props {
  /** 组件 docs 根目录，例如：@components/button/docs/en/*.vue */
  docsRoot: string;
  /** demo 文件名列表，如：['basic.vue', 'sizes.vue'] */
  files: string[];
}

const props = defineProps<Props>();

// 收集所有 docs 下的示例 .vue 文件，供动态解析使用
const demoModules = import.meta.glob<{ default: Component }>('@components/**/docs/**/*.vue');
const components = computed(() => {
  return props.files.map(file => {
    const candidates = `${props.docsRoot}/${file}`;
    const loader = demoModules[candidates];
    return loader ? defineAsyncComponent(loader) : null;
  });
});
</script>

<template>
  <div class="space-y-4">
    <template v-for="(file, i) in files" :key="`${file}-${i}`">
      <component :is="components[i]" v-if="components[i]" />
      <div v-else class="text-red-6 text-sm">示例未找到: {{ file }}</div>
    </template>
  </div>
</template>

<route lang="yaml">
meta:
  layout: false
</route>
