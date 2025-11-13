<script setup lang="ts">
import { computed, shallowRef, watchEffect } from 'vue';
import type { Component } from 'vue';
const route = useRoute();

// @ts-expect-error 忽略类型检查错误，因为路由参数可能为空
const name = computed(() => String(route.params.name || ''));

const mdModules = import.meta.glob<{ default: Component }>('@docs-content/**/**/index.md');
const DocComp = shallowRef<any>(null);

async function loadDoc() {
  if (!name.value) return;

  const candidates = [`/src/content/components/${name.value}/index.md`];
  const match = candidates.find(p => mdModules[p]);
  if (match) {
    const load = mdModules[match]!;
    const mod = await load();
    DocComp.value = (mod as any).default;
    return;
  }

  DocComp.value = null;
}

watchEffect(() => {
  // 监听路由参数和语言切换以热更新文档
  loadDoc();
});
</script>

<template>
  <div>
    <component :is="DocComp" v-if="DocComp" />
    <div v-else class="text-center text-sm text-red-6">该组件文档未找到：{{ name }}</div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: false
</route>
