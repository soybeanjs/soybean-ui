<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { Primitive } from 'radix-vue';
import { cn } from '../../shared';
import type { PrimitivePropsWithClass } from '../../types';

defineOptions({
  name: 'SAlertTitle'
});

const props = withDefaults(defineProps<PrimitivePropsWithClass>(), {
  as: 'h5'
});

const delegatedProps = reactiveOmit(props, ['class']);
</script>

<template>
  <Primitive v-bind="delegatedProps" :class="cn('mb-1 font-medium leading-none tracking-tight', props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
