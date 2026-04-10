<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { Primitive } from '../primitive';
import { useEditableRootContext, useEditableUi } from './context';
import type { EditableEditTriggerProps } from './types';

defineOptions({
  name: 'EditableEditTrigger'
});

const props = withDefaults(defineProps<EditableEditTriggerProps>(), {
  as: 'button'
});

const attrs = useAttrs();

const { dataDisabled, dataReadonly, dataState, disabled, edit, isEditing, readonly } =
  useEditableRootContext('EditableEditTrigger');

const cls = useEditableUi('editTrigger');

const buttonType = computed(() => (props.as === 'button' ? 'button' : undefined));
const triggerDisabled = computed(() => disabled.value || readonly.value);
const ariaLabel = computed(() => {
  if (attrs['aria-labelledby']) {
    return undefined;
  }

  return (attrs['aria-label'] as string) || 'Edit';
});

function onClick() {
  edit();
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
    :disabled="triggerDisabled"
    :hidden="isEditing"
    :type="buttonType"
    @click="onClick"
  >
    <slot>Edit</slot>
  </Primitive>
</template>
