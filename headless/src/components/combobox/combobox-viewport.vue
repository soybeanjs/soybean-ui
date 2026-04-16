<script setup lang="ts">
import { useAttrs } from 'vue';
import { useNonce } from '../config-provider/context';
import { ListboxContent } from '../listbox';
import { Primitive } from '../primitive';
import type { ComboboxViewportProps } from './types';

defineOptions({
  name: 'ComboboxViewport',
  inheritAttrs: false
});

const props = defineProps<ComboboxViewportProps>();

const attrs = useAttrs();
const nonce = useNonce(() => props.nonce);

const css = `
[data-soybean-combobox-viewport] {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}
[data-soybean-combobox-viewport]::-webkit-scrollbar {
  display: none;
}`;
</script>

<template>
  <ListboxContent v-bind="attrs" data-slot="viewport" data-soybean-combobox-viewport>
    <slot />
  </ListboxContent>
  <Primitive as="style" :nonce="nonce">{{ css }}</Primitive>
</template>
