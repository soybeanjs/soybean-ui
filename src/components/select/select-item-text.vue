<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { useForwardElement } from '../../composables';
import { useSelectContentContext, useSelectItemContext, useSelectRootContext, useSelectThemeContext } from './context';
import type { SelectItemTextProps } from './types';

defineOptions({
  name: 'SelectItemText'
});

const props = defineProps<SelectItemTextProps>();

const { onOptionAdd, onOptionRemove } = useSelectRootContext('SelectItemText');
const { onSelectedItemTextElementChange } = useSelectContentContext('SelectItemText');
const { onItemTextElementChange, value, disabled, textId, initTextId } = useSelectItemContext('SelectItemText');

const [itemTextElement, setItemTextElement] = useForwardElement(node => {
  onItemTextElementChange(node);
  onSelectedItemTextElementChange(node, value, disabled.value ?? false);
});

const themeContext = useSelectThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.itemText, props.class]);

const optionProps = computed(() => {
  return {
    value,
    disabled: disabled.value ?? false,
    textContent: itemTextElement.value?.textContent ?? value?.toString() ?? ''
  };
});

initTextId();

onMounted(() => {
  onOptionAdd(optionProps.value);
});

onBeforeUnmount(() => {
  onOptionRemove(optionProps.value);
});
</script>

<template>
  <span v-bind="props" :id="textId" :ref="setItemTextElement" :class="cls">
    <slot />
  </span>
</template>
