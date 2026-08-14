<script setup lang="ts">
import { ref } from 'vue';
import { SCascader } from '@soybeanjs/ui';
import type { CascaderOptionData } from '@soybeanjs/ui';

const value = ref<string[]>();

const options: CascaderOptionData<string>[] = [
  {
    label: '华东',
    value: 'east',
    children: [
      { label: '上海', value: 'shanghai' },
      { label: '江苏', value: 'jiangsu' }
    ]
  },
  {
    label: '华南',
    value: 'south',
    children: [{ label: '广东', value: 'guangdong' }]
  }
];
</script>

<template>
  <div class="w-80 lt-md:w-auto flex-c gap-2">
    <SCascader v-model="value" path-mode :options="options" placeholder="以路径数组作为值" />
    <p class="text-sm text-muted-foreground">Selected: {{ value?.join(' / ') ?? 'None' }}</p>
  </div>
</template>
