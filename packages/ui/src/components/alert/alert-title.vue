<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { Primitive } from 'radix-vue';
import { alertVariants, cn } from '@soybean-unify/ui-variants';
import type { AlertTitleProps } from './types';

defineOptions({
  name: 'SAlertTitle'
});

const props = withDefaults(defineProps<AlertTitleProps>(), {
  as: 'h5'
});

const delegatedProps = reactiveOmit(props, ['class']);

const { title } = alertVariants();
</script>

<template>
  <Primitive v-bind="delegatedProps" :class="cn(title(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
