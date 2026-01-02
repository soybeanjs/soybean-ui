<script setup lang="ts">
import { useLayoutUi } from './context';
import type { LayoutHeaderProps } from './types';

defineOptions({
  name: 'LayoutHeader'
});

defineProps<LayoutHeaderProps>();

const cls = useLayoutUi('header');
</script>

<template>
  <header :class="cls">
    <slot />
  </header>
</template>
