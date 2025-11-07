<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useForwardElement } from '../../composables';
import { useSelectContentContext, useSelectItemContext, useSelectRootContext, useSelectThemeContext } from './context';
import type { SelectItemTextProps } from './types';

defineOptions({
  name: 'SelectItemText'
});

defineProps<SelectItemTextProps>();

const { onOptionAdd, onOptionRemove } = useSelectRootContext('SelectItemText');
const { onSelectedItemTextElementChange } = useSelectContentContext('SelectItemText');
const { onItemTextElementChange, value, disabled, textId, initTextId } = useSelectItemContext('SelectItemText');

const [itemTextElement, setItemTextElement] = useForwardElement(node => {
  onItemTextElementChange(node);
  onSelectedItemTextElementChange(node, value, disabled.value ?? false);
});

const themeContext = useSelectThemeContext();

const cls = computed(() => themeContext?.ui?.value?.itemText);

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

onUnmounted(() => {
  onOptionRemove(optionProps.value);
});
</script>

<template>
  <span :id="textId" :ref="setItemTextElement" :class="cls">
    <slot />
  </span>
</template>
