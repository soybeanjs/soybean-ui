<script setup lang="ts">
import { useTreeNavUi } from './context';
import type { TreeNavOverflowProps } from './types';

defineOptions({
  name: 'TreeNavOverflow'
});

defineProps<TreeNavOverflowProps>();

const cls = useTreeNavUi('overflow');
</script>

<template>
  <div data-soybean-tree-nav-overflow :class="cls">
    <slot />
  </div>
</template>
