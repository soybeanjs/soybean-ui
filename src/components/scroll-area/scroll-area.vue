<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { ScrollAreaCompact, provideScrollAreaUi } from '@soybeanjs/headless/scroll-area';
import { scrollAreaVariants } from '@/styles/scroll-area';
import type { ScrollAreaProps } from './types';

defineOptions({
  name: 'SScrollArea'
});

const props = defineProps<ScrollAreaProps>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'size']);

const ui = computed(() => scrollAreaVariants({ size: props.size }, props.ui, { root: props.class }));

provideScrollAreaUi(ui);
</script>

<template>
  <ScrollAreaCompact v-bind="forwardedProps">
    <slot />
  </ScrollAreaCompact>
</template>
