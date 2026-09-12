<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { listVariants } from '@/styles/list';
import { provideListUi } from './context';
import type { ListProps } from './types';

defineOptions({
  name: 'SList'
});

const props = defineProps<ListProps>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const ui = computed(() => listVariants({ size: props.size }, props.ui, { root: props.class }));

provideListUi(ui);
</script>

<template>
  <ul v-bind="forwardedProps" data-soybean-list-root :class="ui.root">
    <slot />
  </ul>
</template>
