<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectSelectGroupContext } from './context';
import type { SelectLabelPropsWithPrimitive } from './types';

defineOptions({
  name: 'SelectLabel'
});

const props = withDefaults(defineProps<SelectLabelPropsWithPrimitive>(), {
  as: 'div'
});

const groupContext = injectSelectGroupContext({ id: '' });
</script>

<template>
  <Primitive v-bind="props" :id="groupContext.id">
    <slot />
  </Primitive>
</template>
