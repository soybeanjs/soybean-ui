<script setup lang="ts">
import { useLayoutUi } from './context';
import type { LayoutFooterProps } from './types';

defineOptions({
  name: 'LayoutFooter'
});

defineProps<LayoutFooterProps>();

const cls = useLayoutUi('footer');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
