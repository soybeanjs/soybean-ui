<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import { SButtonIcon, SSegment } from 'soy-ui';
import type { SegmentOptionData } from 'soy-ui';
import { kebabCase } from 'es-toolkit';
import { Copy, CopyCheck } from 'lucide-vue-next';
import { highlight } from '../../shared/shiki';

defineOptions({
  name: 'ComponentPreview'
});

interface Props {
  name: string;
}

const props = defineProps<Props>();

const instance = getCurrentInstance();
const { copy, copied } = useClipboard();

function getCode(name: string) {
  const pathName = kebabCase(name);

  const codeRecord = instance?.appContext?.config?.globalProperties?.$code as Record<string, string>;

  if (!codeRecord) {
    return '';
  }

  return codeRecord[pathName];
}

const items = [
  {
    value: 'preview',
    label: 'Preview'
  },
  {
    value: 'code',
    label: 'Code'
  }
] satisfies SegmentOptionData[];

const active = ref('preview');

const code = computed(() => getCode(props.name));

const codeHtml = computed(() => highlight(code.value, 'vue'));
</script>

<template>
  <div class="flex justify-end py-4">
    <SSegment v-model="active" :items="items" />
  </div>

  <slot v-if="active === 'preview'"></slot>
  <div v-else class="relative">
    <SButtonIcon class="absolute right-5 top-3 text-muted-foreground" @click="copy(code)">
      <Copy v-if="!copied" />
      <CopyCheck v-else />
    </SButtonIcon>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="h-[calc(100vh-380px)] overflow-auto" v-html="codeHtml" />
  </div>
</template>

<style scoped>
:deep(pre) {
  margin: 0;
}
</style>
