<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectEditableRootContext } from './context';
import type { EditableEditTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'EditableEditTrigger'
});

const props = withDefaults(defineProps<EditableEditTriggerPropsWithPrimitive>(), { as: 'button' });

const context = injectEditableRootContext();
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="edit"
    :aria-disabled="context.disabled.value ? '' : undefined"
    :data-disabled="context.disabled.value ? '' : undefined"
    :disabled="context.disabled.value"
    :type="as === 'button' ? 'button' : undefined"
    :hidden="context.isEditing.value ? '' : undefined"
    @click="context.edit"
  >
    <slot>Edit</slot>
  </Primitive>
</template>
