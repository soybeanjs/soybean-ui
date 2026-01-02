<script setup lang="ts">
import { useMenuUi } from './context';
import type { MenuGroupLabelProps } from './types';

defineOptions({
  name: 'MenuGroupLabel'
});

defineProps<MenuGroupLabelProps>();

const cls = useMenuUi('groupLabel');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
