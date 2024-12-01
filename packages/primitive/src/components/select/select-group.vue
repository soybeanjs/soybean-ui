<script setup lang="ts">
import { useId } from '../../composables';
import { Primitive } from '../primitive';
import { provideSelectGroupContext } from './context';
import type { SelectGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'SelectGroup'
});

const props = defineProps<SelectGroupPropsWithPrimitive>();

const id = useId(undefined, 'soybean-select-group');
provideSelectGroupContext({ id });
</script>

<template>
  <Primitive role="group" v-bind="props" :aria-labelledby="id">
    <slot />
  </Primitive>
</template>
