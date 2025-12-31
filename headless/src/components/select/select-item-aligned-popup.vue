<script setup lang="ts">
import { useForwardElement } from '../../composables';
import { useSelectPopupElementContext } from './context';
import type { SelectPopupProps } from './types';

defineOptions({
  name: 'SelectItemAlignedPopup'
});

defineProps<SelectPopupProps>();

const { onPopupElementChange } = useSelectPopupElementContext('SelectItemAlignedPopup');

const [_, setPopupElement] = useForwardElement(onPopupElementChange);
</script>

<template>
  <div :ref="setPopupElement" style="box-sizing: border-box; max-height: 100%">
    <slot />
  </div>
</template>
