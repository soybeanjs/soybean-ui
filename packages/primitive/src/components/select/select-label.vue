<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';
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
