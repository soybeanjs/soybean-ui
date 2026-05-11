<script setup lang="ts">
import { computed } from 'vue';
import { SplitterGroup, provideSplitterUi } from '@soybeanjs/headless/splitter';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeVariants } from '@/theme';
import { splitterVariants } from './variants';
import type { SplitterGroupProps, SplitterGroupEmits } from './types';

defineOptions({
  name: 'SSplitterGroup'
});

const props = defineProps<SplitterGroupProps>();

const emit = defineEmits<SplitterGroupEmits>();

const forwardedProps = useOmitProps(props, ['class', 'ui']);

const listeners = useForwardListeners(emit);

const ui = computed(() => mergeVariants(splitterVariants(), props.ui, { root: props.class }));

provideSplitterUi(ui);
</script>

<template>
  <SplitterGroup v-bind="forwardedProps" v-on="listeners">
    <slot />
  </SplitterGroup>
</template>
