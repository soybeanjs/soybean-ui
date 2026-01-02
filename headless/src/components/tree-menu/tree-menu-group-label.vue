<script setup lang="ts">
import { useTreeMenuUi } from './context';
import type { TreeMenuGroupLabelProps } from './types';

defineOptions({
  name: 'TreeMenuGroupLabel'
});

defineProps<TreeMenuGroupLabelProps>();

const cls = useTreeMenuUi('groupLabel');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
