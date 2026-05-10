<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { provideTagsInputItemContext, useCollectionItem, useTagsInputRootContext, useTagsInputUi } from './context';
import type { TagsInputItemProps } from './types';

defineOptions({
  name: 'TagsInputItem'
});

const props = defineProps<TagsInputItemProps>();

const cls = useTagsInputUi('item');

const {
  selectedElement,
  disabled: rootDisabled,
  getItems,
  onRemoveValue,
  displayValue
} = useTagsInputRootContext('TagsInputItem');
const { itemElement, setItemElement } = useCollectionItem(() => ({
  value: props.value
}));

const forwardedProps = useOmitProps(props, ['value', 'disabled']);

const isSelected = computed(() => selectedElement.value === itemElement.value);
const disabled = computed(() => rootDisabled.value || props.disabled);
const textId = shallowRef('');

const displayedValue = computed(() => displayValue(props.value));

const onDelete = () => {
  const index = getItems().findIndex(item => item.element === itemElement.value);
  onRemoveValue(index);
};

provideTagsInputItemContext({
  value: computed(() => props.value),
  displayedValue: displayedValue,
  isSelected,
  disabled,
  itemElement,
  textId,
  onDelete
});
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :ref="setItemElement"
    data-soybean-tags-input-item
    data-soybean-collection-item
    :class="cls"
    :aria-labelledby="textId || undefined"
    :aria-current="isSelected ? 'true' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-state="isSelected ? 'active' : 'inactive'"
  >
    <slot :on-delete="onDelete" :displayed-value="displayedValue" />
  </Primitive>
</template>
