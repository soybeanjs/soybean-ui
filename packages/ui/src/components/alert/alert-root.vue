<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { Primitive } from 'radix-vue';
import { alertVariants } from '@soybean-unify/ui-variants';
import { cn } from '../../shared';
import type { AlertRootProps } from './types';

defineOptions({
  name: 'SAlertRoot'
});

const props = withDefaults(defineProps<AlertRootProps>(), {
  as: 'div'
});

const delegatedProps = reactiveOmit(props, ['class']);
</script>

<template>
  <Primitive v-bind="delegatedProps" :class="cn(alertVariants({ color, variant }), props.class)" role="alert">
    <slot />
  </Primitive>
</template>

<style scoped></style>
