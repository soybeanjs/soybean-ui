<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectEditableRootContext } from './context';
import type { EditableSubmitTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'EditableSubmitTrigger'
});

const props = withDefaults(defineProps<EditableSubmitTriggerPropsWithPrimitive>(), { as: 'button' });

const context = injectEditableRootContext();
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="submit"
    :aria-disabled="context.disabled.value ? '' : undefined"
    :data-disabled="context.disabled.value ? '' : undefined"
    :disabled="context.disabled.value"
    :type="as === 'button' ? 'button' : undefined"
    :hidden="context.isEditing.value ? undefined : ''"
    @click="context.submit"
  >
    <slot>Submit</slot>
  </Primitive>
</template>
