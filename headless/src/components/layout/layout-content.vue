<script setup lang="ts">
import { useLayoutUi } from './context';
import type { LayoutContentProps } from './types';

defineOptions({
  name: 'LayoutContent'
});

defineProps<LayoutContentProps>();

const cls = useLayoutUi('content');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
