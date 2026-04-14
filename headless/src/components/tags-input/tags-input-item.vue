<script setup lang="ts" generic="T extends TagsInputAcceptableValue = string">
import { computed, shallowRef } from 'vue';
import { useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { provideTagsInputItemContext, useCollectionItem, useTagsInputRootContext, useTagsInputUi } from './context';
import type { TagsInputAcceptableValue, TagsInputItemProps } from './types';

defineOptions({
  name: 'TagsInputItem'
});

const props = withDefaults(defineProps<TagsInputItemProps<T>>(), {
  as: 'div'
});

const cls = useTagsInputUi('item');

const { selectedElement, disabled: rootDisabled, displayValue } = useTagsInputRootContext('TagsInputItem');
const { itemElement, itemProps, setItemElement } = useCollectionItem(() => ({
  value: props.value as TagsInputAcceptableValue
}));

const forwardedProps = useOmitProps(props, ['value', 'disabled'], itemProps);

const isSelected = computed(() => selectedElement.value === itemElement.value);
const disabled = computed(() => rootDisabled.value || props.disabled);
const textId = shallowRef('');

provideTagsInputItemContext({
  value: computed(() => props.value as TagsInputAcceptableValue),
  displayValue: computed(() => displayValue(props.value as TagsInputAcceptableValue)),
  isSelected,
  disabled,
  itemElement,
  textId
});
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :ref="setItemElement"
    :class="cls"
    :aria-labelledby="textId || undefined"
    :aria-current="isSelected ? 'true' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-state="isSelected ? 'active' : 'inactive'"
  >
    <slot />
  </Primitive>
</template>
