<script setup lang="ts">
import { PopperAnchor } from '../popper';
import { useComboboxUi } from './context';
import type { ComboboxAnchorProps } from './types';

defineOptions({
  name: 'ComboboxAnchor'
});

defineProps<ComboboxAnchorProps>();

const cls = useComboboxUi('anchor');
</script>

<template>
  <PopperAnchor :as="as" :as-child="asChild" :class="cls" :reference="reference" data-slot="anchor">
    <slot />
  </PopperAnchor>
</template>
