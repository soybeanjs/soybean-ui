<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { Primitive } from 'radix-vue';
import { alertVariants, cn } from '@soybean-unify/ui-variants';
import type { AlertTitleRootProps } from './types';

defineOptions({
  name: 'SAlertTitleRoot'
});

const props = withDefaults(defineProps<AlertTitleRootProps>(), {
  as: 'div'
});

const delegatedProps = reactiveOmit(props, ['class']);

const { titleRoot } = alertVariants();
</script>

<template>
  <Primitive v-bind="delegatedProps" :class="cn(titleRoot(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
