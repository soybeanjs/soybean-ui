<script setup lang="ts">
import { type ComputedRef, type Ref, computed, toRefs } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { createContext, useCollection, useForwardExpose } from '../../composables';
import { type AcceptableInputValue, injectTagsInputRootContext } from './tags-input-root.vue';

export interface TagsInputItemProps extends PrimitiveProps {
  /** Value associated with the tags */
  value: AcceptableInputValue;
  /** When `true`, prevents the user from interacting with the tags input. */
  disabled?: boolean;
}

export interface TagsInputItemContext {
  value: Ref<AcceptableInputValue>;
  displayValue: ComputedRef<string>;
  isSelected: Ref<boolean>;
  disabled?: Ref<boolean>;
  textId: string;
}

export const [injectTagsInputItemContext, provideTagsInputItemContext] =
  createContext<TagsInputItemContext>('TagsInputItem');

const props = defineProps<TagsInputItemProps>();
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
