<script lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectTagsInputRootContext } from './tags-input-root.vue';
</script>

<script setup lang="ts">
export interface TagsInputClearProps extends PrimitiveProps {}

const props = withDefaults(defineProps<TagsInputClearProps>(), {
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
