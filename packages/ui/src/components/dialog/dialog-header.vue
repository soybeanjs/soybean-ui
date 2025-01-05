<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { DialogHeaderProps } from './types';

defineOptions({
  name: 'SDialogHeader'
});

const { class: cls } = defineProps<DialogHeaderProps>();

const { header } = dialogVariants();

const mergedCls = computed(() => cn(header(), cls));
</script>

<template>
  <Primitive :class="mergedCls" as="div">
    <slot />
  </Primitive>
</template>
