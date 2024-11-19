<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useCollection, useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectTagsInputRootContext, provideTagsInputItemContext } from './context';
import type { TagsInputItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'TagsInputItem'
});

const props = defineProps<TagsInputItemPropsWithPrimitive>();
const { value } = toRefs(props);

const context = injectTagsInputRootContext();
const { forwardRef, currentElement } = useForwardExpose();
const { CollectionItem } = useCollection();

const isSelected = computed(() => context.selectedElement.value === currentElement.value);
const disabled = computed(() => props.disabled || context.disabled.value);

const itemContext = provideTagsInputItemContext({
  value,
  isSelected,
  disabled,
  textId: '',
  displayValue: computed(() => context.displayValue(value.value))
});
</script>

<template>
  <CollectionItem :value="value">
    <Primitive
      :ref="forwardRef"
      :as
      :as-child
      :aria-labelledby="itemContext.textId"
      :aria-current="isSelected"
      :data-disabled="disabled ? '' : undefined"
      :data-state="isSelected ? 'active' : 'inactive'"
    >
      <slot />
    </Primitive>
  </CollectionItem>
</template>
