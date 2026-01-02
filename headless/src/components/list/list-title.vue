<script setup lang="ts">
import { useListUi } from './context';
import type { ListTitleProps } from './types';

defineOptions({
  name: 'ListTitle'
});

defineProps<ListTitleProps>();

const cls = useListUi('title');
</script>

<template>
  <h3 :class="cls">
    <slot />
  </h3>
</template>
