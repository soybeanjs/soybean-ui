<script setup lang="ts">
import { useLayoutUi } from './context';
import type { LayoutTabProps } from './types';

defineOptions({
  name: 'LayoutTab'
});

defineProps<LayoutTabProps>();

const cls = useLayoutUi('tab');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
