<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectListboxGroupContext } from './context';
import type { ListboxGroupLabelPropsWithPrimitive } from './types';

defineOptions({
  name: 'ListboxGroupLabel'
});

const props = withDefaults(defineProps<ListboxGroupLabelPropsWithPrimitive>(), {
  as: 'div'
});

const groupContext = injectListboxGroupContext({ id: '' });
</script>

<template>
  <Primitive v-bind="props" :id="groupContext.id">
    <slot />
  </Primitive>
</template>
