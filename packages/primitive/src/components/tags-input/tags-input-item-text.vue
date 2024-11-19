<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose, useId } from '../../composables';
import { injectTagsInputItemContext } from './tags-input-item.vue';

export interface TagsInputItemTextProps extends PrimitiveProps {}

const props = withDefaults(defineProps<TagsInputItemTextProps>(), {
  as: 'span'
});

const itemContext = injectTagsInputItemContext();
useForwardExpose();

itemContext.textId ||= useId(undefined, 'soybean-tags-input-item-text');
</script>

<template>
  <Primitive v-bind="props" :id="itemContext.textId">
    <slot>{{ itemContext.displayValue.value }}</slot>
  </Primitive>
</template>
