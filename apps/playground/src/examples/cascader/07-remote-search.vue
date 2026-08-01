<script setup lang="ts">
import { ref } from 'vue';
import { SCascader } from '@soybeanjs/ui';
import type { CascaderOptionData } from '@soybeanjs/ui';

const value = ref<string>();

const options: CascaderOptionData<string>[] = [
  {
    label: '前端',
    value: 'frontend',
    children: [
      { label: 'Vue', value: 'vue' },
      { label: 'React', value: 'react' },
      { label: 'Svelte', value: 'svelte' }
    ]
  },
  {
    label: '后端',
    value: 'backend',
    children: [
      { label: 'Go', value: 'go' },
      { label: 'Rust', value: 'rust' }
    ]
  },
  {
    label: '运维',
    value: 'ops',
    children: [
      { label: 'K8s', value: 'k8s' },
      { label: 'Terraform', value: 'terraform' }
    ]
  }
];

const onSearch = (pattern: string) => {
  return new Promise<CascaderOptionData<string>[]>(resolve => {
    window.setTimeout(() => {
      const flat: CascaderOptionData<string>[] = [];
      for (const group of options) {
        for (const child of group.children ?? []) {
          if (String(child.label).includes(pattern)) {
            flat.push({ ...child, children: [{ label: group.label, value: group.value, disabled: true }] });
          }
        }
      }
      resolve(flat);
    }, 400);
  });
};
</script>

<template>
  <div class="w-80 lt-md:w-auto flex-c gap-2">
    <SCascader v-model="value" filterable remote :options="options" :on-search="onSearch" placeholder="远程搜索" />
    <p class="text-sm text-muted-foreground">Selected: {{ value ?? 'None' }}</p>
  </div>
</template>
