<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { Primitive } from '../primitive';
import { useEditableRootContext, useEditableUi } from './context';
import type { EditableSubmitTriggerProps } from './types';

defineOptions({
  name: 'EditableSubmitTrigger'
});

const props = withDefaults(defineProps<EditableSubmitTriggerProps>(), {
  as: 'button'
});

const attrs = useAttrs();

const { dataDisabled, dataReadonly, dataState, disabled, isEditing, submit } =
  useEditableRootContext('EditableSubmitTrigger');

const cls = useEditableUi('submitTrigger');

const buttonType = computed(() => (props.as === 'button' ? 'button' : undefined));
const ariaLabel = computed(() => {
  if (attrs['aria-labelledby']) {
    return undefined;
  }

  return (attrs['aria-label'] as string) || 'Submit';
});

function onClick() {
  submit();
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
    <slot>Submit</slot>
  </Primitive>
</template>
