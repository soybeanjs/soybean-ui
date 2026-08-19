<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import type { TypographyTitleProps } from './types';

defineOptions({
  name: 'TypographyTitle'
});

const props = withDefaults(defineProps<TypographyTitleProps>(), {
  level: 1,
  as: undefined,
  asChild: false
});

const as = computed(() => props.as ?? `h${props.level}`);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" data-soybean-typography-title :data-level="level">
    <slot />
  </Primitive>
</template>
