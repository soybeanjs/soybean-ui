<script setup lang="ts">
import { useId } from 'vue';
import { useTagsInputItemContext, useTagsInputUi } from './context';
import type { TagsInputItemTextProps } from './types';

defineOptions({
  name: 'TagsInputItemText'
});

const props = defineProps<TagsInputItemTextProps>();

const cls = useTagsInputUi('itemText');

const { displayedValue, textId } = useTagsInputItemContext('TagsInputItemText');

if (!textId.value) {
  textId.value = `soybean-tags-input-item-text-${useId()}`;
}
</script>

<template>
  <span v-bind="props" :id="textId" :class="cls" data-slot="item-text">
    <slot>{{ displayedValue }}</slot>
  </span>
</template>
