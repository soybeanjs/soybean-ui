<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';
import { injectEditableRootContext } from './editable-root.vue';

export interface EditableCancelTriggerProps extends PrimitiveProps {}

const props = withDefaults(defineProps<EditableCancelTriggerProps>(), { as: 'button' });

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
