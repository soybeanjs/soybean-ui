<script setup lang="ts">
import { computed } from 'vue';
import { SplitterGroup, provideSplitterUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { splitterVariants } from './variants';
import type { SplitterGroupEmits, SplitterGroupProps } from './types';

defineOptions({
  name: 'SSplitterGroup'
});

const props = defineProps<SplitterGroupProps>();

const emit = defineEmits<SplitterGroupEmits>();

const forwardedProps = useOmitProps(props, ['class', 'ui']);

const listeners = useForwardListeners(emit);

const ui = computed(() => mergeSlotVariants(splitterVariants(), props.ui, { root: props.class }));

provideSplitterUi(ui);
</script>

<template>
  <SplitterGroup data-slot="splitter-group" v-bind="forwardedProps" v-on="listeners">
    <slot />
  </SplitterGroup>
</template>
