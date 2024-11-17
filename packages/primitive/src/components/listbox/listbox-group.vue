<script lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { createContext, useId } from '../../_shared';
</script>

<script setup lang="ts">
export interface ListboxGroupProps extends PrimitiveProps {}

interface ListboxGroupContext {
  id: string;
}

export const [injectListboxGroupContext, provideListboxGroupContext] =
  createContext<ListboxGroupContext>('ListboxGroup');

const props = defineProps<ListboxGroupProps>();

const id = useId(undefined, 'soybean-listbox-group');
provideListboxGroupContext({ id });
</script>

<template>
  <Primitive role="group" v-bind="props" :aria-labelledby="id">
    <slot />
  </Primitive>
</template>
