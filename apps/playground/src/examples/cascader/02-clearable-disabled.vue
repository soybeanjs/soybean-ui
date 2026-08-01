<script setup lang="ts">
import { ref } from 'vue';
import { SCascader } from '@soybeanjs/ui';
import type { CascaderOptionData } from '@soybeanjs/ui';

const value = ref<string>();
const value2 = ref<string>();

const options: CascaderOptionData<string>[] = [
  {
    label: '电子产品',
    value: 'electronics',
    children: [
      {
        label: '手机',
        value: 'phone',
        children: [
          { label: '智能手机', value: 'smartphone' },
          { label: '老人机', value: 'feature-phone' }
        ]
      },
      {
        label: '电脑',
        value: 'computer',
        children: [{ label: '笔记本', value: 'laptop' }]
      }
    ]
  },
  {
    label: '服饰',
    value: 'clothing',
    disabled: true,
    children: [
      {
        label: '男装',
        value: 'men',
        children: [{ label: '夹克', value: 'jacket' }]
      }
    ]
  }
];
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="w-80 lt-md:w-auto flex-c gap-2">
      <SCascader v-model="value" clearable :options="options" placeholder="可清空" />
    </div>
    <div class="w-80 lt-md:w-auto flex-c gap-2">
      <SCascader v-model="value2" disabled :options="options" placeholder="禁用" />
    </div>
  </div>
</template>
