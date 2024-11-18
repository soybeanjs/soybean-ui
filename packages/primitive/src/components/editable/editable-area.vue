<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';
import Primitive from '../primitive/primitive';
import { injectEditableRootContext } from './editable-root.vue';

export interface EditableAreaProps extends PrimitiveProps {}

const props = withDefaults(defineProps<EditableAreaProps>(), { as: 'div' });

const context = injectEditableRootContext();
</script>

<template>
  <Primitive
    v-bind="props"
    :data-placeholder-shown="context.isEditing.value ? undefined : ''"
    :data-focus="context.isEditing.value ? '' : undefined"
    :data-focused="context.isEditing.value ? '' : undefined"
    :data-empty="context.isEmpty.value ? '' : undefined"
    :data-readonly="context.readonly.value ? '' : undefined"
    :data-disabled="context.disabled.value ? '' : undefined"
    :style="context.autoResize.value ? { display: 'inline-grid' } : undefined"
  >
    <slot />
  </Primitive>
</template>
