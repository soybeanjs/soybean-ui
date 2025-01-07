<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectEditableRootContext } from './context';
import type { EditableCancelTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'EditableCancelTrigger'
});

const props = withDefaults(defineProps<EditableCancelTriggerPropsWithPrimitive>(), { as: 'button' });

const context = injectEditableRootContext();
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="cancel"
    :aria-disabled="context.disabled.value ? '' : undefined"
    :data-disabled="context.disabled.value ? '' : undefined"
    :disabled="context.disabled.value"
    :type="as === 'button' ? 'button' : undefined"
    :hidden="context.isEditing.value ? undefined : ''"
    @click="context.cancel"
  >
    <slot>Cancel</slot>
  </Primitive>
</template>
