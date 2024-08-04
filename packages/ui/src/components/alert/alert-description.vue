<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { Primitive } from 'radix-vue';
import { cn } from '@soybean-unify/ui-variants';
import type { PrimitivePropsWithClass } from '../../types';

defineOptions({
  name: 'SAlertDescription'
});

const props = withDefaults(defineProps<PrimitivePropsWithClass>(), {
  as: 'div'
});

const delegatedProps = reactiveOmit(props, ['class']);
</script>

<template>
  <Primitive v-bind="delegatedProps" :class="cn('mt-1 text-sm [&_p]:leading-relaxed', props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
