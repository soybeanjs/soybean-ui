<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { buttonGroupVariants, cn } from '@soybean-ui/variants';
import type { ButtonGroupProps } from '../types';

defineOptions({
  name: 'SButtonGroup'
});

const { class: cls, orientation } = defineProps<ButtonGroupProps>();

const mergedCls = computed(() => cn(buttonGroupVariants({ orientation }), cls));
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>
