<script setup lang="ts">
import { toRefs } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { provideCollapsibleRootContext } from './context';
import type { CollapsibleRootEmits, CollapsibleRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'CollapsibleRoot'
});

const props = withDefaults(defineProps<CollapsibleRootPropsWithPrimitive>(), {
  open: undefined,
  defaultOpen: false,
  unmountOnHide: true
});

const emit = defineEmits<CollapsibleRootEmits>();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false
}) as Ref<boolean>;

const { disabled, unmountOnHide } = toRefs(props);

const { dataState, dataDisabled } = provideCollapsibleRootContext({
  open,
  unmountOnHide,
  disabled
});

useForwardExpose();
defineExpose({ open });
</script>

<template>
  <Primitive :class="props.class" :as :as-child :data-state :data-disabled>
    <slot :open />
  </Primitive>
</template>
