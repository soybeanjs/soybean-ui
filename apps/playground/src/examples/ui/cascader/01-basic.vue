<script setup lang="ts">
import { ref } from 'vue';
import { SCascader } from '@soybeanjs/ui';
import type { CascaderOptionData } from '@soybeanjs/ui';

const value = ref<string>();

const options: CascaderOptionData<string>[] = [
  {
    label: '浙江',
    value: 'zhejiang',
    children: [
      {
        label: '杭州',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '滨江区', value: 'binjiang' }
        ]
      },
      {
        label: '宁波',
        value: 'ningbo',
        children: [{ label: '海曙区', value: 'haishu' }]
      }
    ]
  },
  {
    label: '江苏',
    value: 'jiangsu',
    children: [
      {
        label: '南京',
        value: 'nanjing',
        children: [
          { label: '鼓楼区', value: 'gulou' },
          { label: '玄武区', value: 'xuanwu' }
        ]
      },
      {
        label: '苏州',
        value: 'suzhou',
        children: [{ label: '姑苏区', value: 'gusu' }]
      }
    ]
  },
  {
    label: '上海',
    value: 'shanghai',
    children: [
      { label: '浦东新区', value: 'pudong' },
      { label: '静安区', value: 'jingan' }
    ]
  }
];
</script>

<template>
  <div class="w-80 lt-md:w-auto flex-c gap-2">
    <SCascader v-model="value" :options="options" placeholder="请选择区域" />
    <p class="text-sm text-muted-foreground">Selected: {{ value ?? 'None' }}</p>
  </div>
</template>
