<script setup lang="ts">
import { useForwardExpose, useId } from '../../composables';
import { Primitive } from '../primitive';
import { injectTagsInputItemContext } from './context';
import type { TagsInputItemTextPropsWithPrimitive } from './types';

defineOptions({
  name: 'TagsInputItemText'
});

const props = withDefaults(defineProps<TagsInputItemTextPropsWithPrimitive>(), {
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
