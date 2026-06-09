<script setup lang="ts">
import { computed } from 'vue';
import { ListRoot, provideListUi } from '@soybeanjs/headless/list';
import { listVariants } from '@/styles/list';
import type { ListProps } from './types';

defineOptions({
  name: 'SList'
});

const props = defineProps<ListProps>();

const ui = computed(() => listVariants({ size: props.size }, props.ui, { root: props.class }));

provideListUi(ui);
</script>

<template>
  <ListRoot>
    <slot />
  </ListRoot>
</template>
