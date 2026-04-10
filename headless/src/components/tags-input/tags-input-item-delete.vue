<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useTagsInputItemContext, useTagsInputRootContext, useTagsInputUi } from './context';
import type { TagsInputItemDeleteProps } from './types';

defineOptions({
  name: 'TagsInputItemDelete'
});

const props = withDefaults(defineProps<TagsInputItemDeleteProps>(), {
  as: 'button'
});

const cls = useTagsInputUi('itemDelete');

const { getItems, onRemoveValue } = useTagsInputRootContext('TagsInputItemDelete');
const { disabled, isSelected, itemElement, textId } = useTagsInputItemContext('TagsInputItemDelete');

const type = computed(() => (props.as === 'button' ? 'button' : undefined));
const disabledAttr = computed(() => (props.as === 'button' ? disabled.value : undefined));

const handleDelete = () => {
  if (disabled.value) return;

  const index = getItems().findIndex(item => item.element === itemElement.value);
  onRemoveValue(index);
};
</script>

<template>
  <Primitive
    v-bind="props"
    tabindex="-1"
    :class="cls"
    :aria-labelledby="textId || undefined"
    :aria-current="isSelected ? 'true' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    :data-state="isSelected ? 'active' : 'inactive'"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabledAttr"
    :type="type"
    @click="handleDelete"
  >
    <slot />
  </Primitive>
</template>
