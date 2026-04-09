<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useEditableRootContext, useEditableUi } from './context';
import type { EditableSubmitTriggerProps } from './types';

defineOptions({
  name: 'EditableSubmitTrigger'
});

const props = withDefaults(defineProps<EditableSubmitTriggerProps>(), {
  as: 'button'
});

const { dataDisabled, dataReadonly, dataState, disabled, isEditing, submit } =
  useEditableRootContext('EditableSubmitTrigger');

const cls = useEditableUi('submitTrigger');

const buttonType = computed(() => (props.as === 'button' ? 'button' : undefined));

function onClick() {
  submit();
}
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="Submit"
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
