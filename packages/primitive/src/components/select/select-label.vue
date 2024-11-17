<script lang="ts">
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectSelectGroupContext } from './select-group.vue';

export interface SelectLabelProps extends PrimitiveProps {
  for?: string;
}

const props = withDefaults(defineProps<SelectLabelProps>(), {
  as: 'div'
});

const groupContext = injectSelectGroupContext({ id: '' });
</script>

<template>
  <Primitive v-bind="props" :id="groupContext.id">
    <slot />
  </Primitive>
</template>
