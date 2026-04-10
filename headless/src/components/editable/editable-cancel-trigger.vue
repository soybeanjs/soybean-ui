<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { Primitive } from '../primitive';
import { useEditableRootContext, useEditableUi } from './context';
import type { EditableCancelTriggerProps } from './types';

defineOptions({
  name: 'EditableCancelTrigger'
});

const props = withDefaults(defineProps<EditableCancelTriggerProps>(), {
  as: 'button'
});

const attrs = useAttrs();

const { dataDisabled, dataReadonly, dataState, disabled, cancel, isEditing } =
  useEditableRootContext('EditableCancelTrigger');

const cls = useEditableUi('cancelTrigger');

const buttonType = computed(() => (props.as === 'button' ? 'button' : undefined));
const ariaLabel = computed(() => {
  if (attrs['aria-labelledby']) {
    return undefined;
  }

  return (attrs['aria-label'] as string) || 'Cancel';
});

function onClick() {
  cancel();
}
</script>

<template>
  <Primitive
    v-bind="props"
    :aria-label="ariaLabel"
    :class="cls"
    :data-disabled="dataDisabled"
    :data-readonly="dataReadonly"
    :data-state="dataState"
    :disabled="disabled"
    :hidden="!isEditing"
    :type="buttonType"
    @click="onClick"
  >
    <slot>Cancel</slot>
  </Primitive>
</template>
