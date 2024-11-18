<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';

import { Primitive } from '../primitive';
import { injectListboxGroupContext } from './listbox-group.vue';

export interface ListboxGroupLabelProps extends PrimitiveProps {
  for?: string;
}

const props = withDefaults(defineProps<ListboxGroupLabelProps>(), {
  as: 'div'
});

const groupContext = injectListboxGroupContext({ id: '' });
</script>

<template>
  <Primitive v-bind="props" :id="groupContext.id">
    <slot />
  </Primitive>
</template>
