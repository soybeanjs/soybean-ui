<script lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectSelectRootContext } from './select-root.vue';
</script>

<script setup lang="ts">
import { injectSelectContentContext } from './select-content-impl.vue';
import { injectSelectItemContext } from './select-item.vue';

export interface SelectItemTextProps extends PrimitiveProps {}

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<SelectItemTextProps>(), {
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
