<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { ToolbarRoot, provideToolbarUi } from '@soybeanjs/headless/toolbar';
import { toolbarVariants } from '@/styles/toolbar';
import type { ToolbarProps } from './types';

defineOptions({
  name: 'SToolbar'
});

const props = defineProps<ToolbarProps>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const ui = computed(() => toolbarVariants({ size: props.size }, props.ui, { root: props.class }));

provideToolbarUi(ui);
</script>

<template>
  <ToolbarRoot v-bind="forwardedProps">
    <slot />
  </ToolbarRoot>
</template>
