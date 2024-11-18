<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';
import { injectEditableRootContext } from './editable-root.vue';

export interface EditableSubmitTriggerProps extends PrimitiveProps {}

const props = withDefaults(defineProps<EditableSubmitTriggerProps>(), { as: 'button' });

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
