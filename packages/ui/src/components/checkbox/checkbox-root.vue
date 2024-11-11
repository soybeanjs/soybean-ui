<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'reka-ui';
import { checkboxVariants, cn } from '@soybean-ui/variants';
import type { CheckboxRootProps } from './types';

defineOptions({
  name: 'SCheckboxRoot'
});

const { class: cls } = defineProps<CheckboxRootProps>();

const { root } = checkboxVariants();

const mergedCls = computed(() => cn(root(), cls));
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
