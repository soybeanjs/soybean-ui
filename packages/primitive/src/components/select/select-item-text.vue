<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectSelectContentContext, injectSelectItemContext, injectSelectRootContext } from './context';
import type { SelectItemTextPropsWithPrimitive } from './types';

defineOptions({
  name: 'SelectItemText',
  inheritAttrs: false
});

const props = withDefaults(defineProps<SelectItemTextPropsWithPrimitive>(), {
  as: 'span'
});

const rootContext = injectSelectRootContext();
const contentContext = injectSelectContentContext();
const itemContext = injectSelectItemContext();

const { forwardRef, currentElement: itemTextElement } = useForwardExpose();

const optionProps = computed(() => {
  return {
    value: itemContext.value,
    disabled: itemContext.disabled.value,
    textContent: itemTextElement.value?.textContent ?? itemContext.value.toString()
  };
});

onMounted(() => {
  if (!itemTextElement.value) return;
  itemContext.onItemTextChange(itemTextElement.value);
  contentContext.itemTextRefCallback(itemTextElement.value, itemContext.value, itemContext.disabled.value);
  rootContext.onOptionAdd(optionProps.value);
});

onBeforeUnmount(() => {
  rootContext.onOptionRemove(optionProps.value);
});
</script>

<template>
  <Primitive :id="itemContext.textId" :ref="forwardRef" v-bind="{ ...props, ...$attrs }">
    <slot />
  </Primitive>
</template>
