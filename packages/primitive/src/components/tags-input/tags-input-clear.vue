<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectTagsInputRootContext } from './context';
import type { TagsInputClearPropsWithPrimitive } from './types';

defineOptions({
  name: 'TagsInputClear'
});

const props = withDefaults(defineProps<TagsInputClearPropsWithPrimitive>(), {
  as: 'button'
});

useForwardExpose();
const context = injectTagsInputRootContext();

function handleCancel() {
  if (context.disabled.value) return;
  context.modelValue.value = [];
}
</script>

<template>
  <Primitive
    v-bind="props"
    :type="as === 'button' ? 'button' : undefined"
    :data-disabled="context.disabled.value ? '' : undefined"
    @click="handleCancel"
  >
    <slot />
  </Primitive>
</template>
