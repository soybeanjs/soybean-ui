<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxAnchor } from '@soybean-ui/primitives';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import type { ComboboxAnchorProps } from '../types';

defineOptions({
  name: 'SComboboxAnchor'
});

const { class: cls, reference } = defineProps<ComboboxAnchorProps>();

const { anchor } = comboboxVariants();

const mergedCls = computed(() => cn(anchor(), cls));
</script>

<template>
  <ComboboxAnchor :class="mergedCls" :reference="reference">
    <slot />
  </ComboboxAnchor>
</template>
