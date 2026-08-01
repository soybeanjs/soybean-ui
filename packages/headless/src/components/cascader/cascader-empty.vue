<script setup lang="ts">
import { useCascaderUi } from './context';
import type { CascaderEmptyProps } from './types';

defineOptions({
  name: 'CascaderEmpty'
});

defineProps<CascaderEmptyProps>();

const cls = useCascaderUi('empty');
</script>

<template>
  <div data-soybean-cascader-empty :class="cls" role="status">
    <slot>暂无数据</slot>
  </div>
</template>
