<script setup lang="ts">
import { Primitive } from '../primitive';
import { useId } from '../../composables';
import { provideListboxGroupContext } from './context';
import type { ListboxGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'ListboxGroup'
});

const props = defineProps<ListboxGroupPropsWithPrimitive>();

const id = useId(undefined, 'soybean-listbox-group');
provideListboxGroupContext({ id });
</script>

<template>
  <Primitive role="group" v-bind="props" :aria-labelledby="id">
    <slot />
  </Primitive>
</template>
