<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useVModel } from '../../composables';
import { provideCollapsibleContext } from './context';
import type { CollapsibleRootEmits, CollapsibleRootProps } from './types';

const props = defineProps<CollapsibleRootProps>();

const emit = defineEmits<CollapsibleRootEmits>();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: props.open === undefined
});

const { disabled } = provideCollapsibleContext({
  open,
  disabled: computed(() => props.disabled),
  unmountOnHide: computed(() => props.unmountOnHide)
});

defineExpose({
  open
});
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :data-disabled="disabled ? '' : undefined"
    :data-state="open ? 'open' : 'closed'"
  >
    <slot :open="open" />
  </Primitive>
</template>
