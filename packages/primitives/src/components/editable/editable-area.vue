<script setup lang="ts">
import { Primitive } from '../primitive';
import type { EditableAreaPropsWithPrimitive } from './types';
import { injectEditableRootContext } from './context';

defineOptions({
  name: 'EditableArea'
});

const props = withDefaults(defineProps<EditableAreaPropsWithPrimitive>(), { as: 'div' });

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
