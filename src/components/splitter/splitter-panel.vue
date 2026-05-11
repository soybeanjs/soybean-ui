<script setup lang="ts">
import { SplitterPanel } from '@soybeanjs/headless/splitter';
import { useForwardListeners } from '@soybeanjs/headless/composables';
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
