<script setup lang="ts">
import { useVModel } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { Primitive } from '../primitive';
import { provideCollapsibleRootContext } from './context';
import type { CollapsibleRootEmits, CollapsibleRootProps } from './types';

const props = defineProps<CollapsibleRootProps>();

const emit = defineEmits<CollapsibleRootEmits>();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: props.open === undefined
});

const { dataDisabled, dataState } = provideCollapsibleRootContext({
  open,
  ...transformPropsToContext(props, ['disabled', 'unmountOnHide'])
});

defineExpose({
  open
});
</script>

<template>
  <Primitive :class="props.class" :as="as" :data-disabled="dataDisabled" :data-state="dataState">
    <slot :open="open" />
  </Primitive>
</template>
