<script setup lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive/types';
import Primitive from '../primitive/primitive';
import { useForwardExpose } from '../../composables';
import { injectTagsInputItemContext } from './tags-input-item.vue';
import { injectTagsInputRootContext } from './tags-input-root.vue';

export interface TagsInputItemDeleteProps extends PrimitiveProps {}

const props = withDefaults(defineProps<TagsInputItemDeleteProps>(), {
  as: 'button'
});

useForwardExpose();
const context = injectTagsInputRootContext();
const itemContext = injectTagsInputItemContext();

const disabled = computed(() => itemContext.disabled?.value || context.disabled.value);

function handleDelete() {
  if (disabled.value) return;
  const index = context.modelValue.value.findIndex(i => i === itemContext.value.value);
  context.onRemoveValue(index);
}
</script>

<template>
  <Primitive
    tabindex="-1"
    v-bind="props"
    :aria-labelledby="itemContext.textId"
    :aria-current="itemContext.isSelected.value"
    :data-state="itemContext.isSelected.value ? 'active' : 'inactive'"
    :data-disabled="disabled ? '' : undefined"
    :type="as === 'button' ? 'button' : undefined"
    @click="handleDelete"
  >
    <slot />
  </Primitive>
</template>
