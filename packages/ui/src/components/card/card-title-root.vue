<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardTitleRootProps } from './types';

defineOptions({
  name: 'SCardTitleRoot'
});

const { class: cls } = defineProps<CardTitleRootProps>();

const { titleRoot } = cardVariants();

const mergedCls = computed(() => cn(titleRoot(), cls));
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </Primitive>
</template>
