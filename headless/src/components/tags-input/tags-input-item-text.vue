<script setup lang="ts">
import { useId } from 'vue';
import { Primitive } from '../primitive';
import { useTagsInputItemContext, useTagsInputUi } from './context';
import type { TagsInputItemTextProps } from './types';

defineOptions({
  name: 'TagsInputItemText'
});

const props = withDefaults(defineProps<TagsInputItemTextProps>(), {
  as: 'span'
});

const cls = useTagsInputUi('itemText');

const { displayValue, textId } = useTagsInputItemContext('TagsInputItemText');

if (!textId.value) {
  textId.value = `soybean-tags-input-item-text-${useId()}`;
}
</script>

<template>
  <Primitive v-bind="props" :id="textId" :class="cls">
    <slot>{{ displayValue }}</slot>
  </Primitive>
</template>
