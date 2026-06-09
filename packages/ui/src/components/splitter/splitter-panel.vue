<script setup lang="ts">
import { useForwardListeners } from '@soybeanjs/headless/composables';
import { SplitterPanel } from '@soybeanjs/headless/splitter';
import type { SplitterPanelProps, SplitterPanelEmits } from './types';

defineOptions({
  name: 'SSplitterPanel'
});

const props = defineProps<SplitterPanelProps>();

const emit = defineEmits<SplitterPanelEmits>();

const listeners = useForwardListeners(emit);
</script>

<template>
  <SplitterPanel v-slot="slotProps" v-bind="props" v-on="listeners">
    <slot v-bind="slotProps" />
  </SplitterPanel>
</template>
