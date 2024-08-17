<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { Primitive } from 'radix-vue';
import { alertVariants, cn } from '@soybean-unify/ui-variants';
import type { AlertHeaderProps } from './types';

defineOptions({
  name: 'SAlertHeader'
});

const props = withDefaults(defineProps<AlertHeaderProps>(), {
  as: 'div'
});

const delegatedProps = reactiveOmit(props, ['class']);

const { header } = alertVariants();
</script>

<template>
  <Primitive v-bind="delegatedProps" :class="cn(header(), props.class)" role="alert">
    <slot />
  </Primitive>
</template>

<style scoped></style>
