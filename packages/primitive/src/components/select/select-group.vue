<script lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { createContext, useId } from '../../_shared';
</script>

<script setup lang="ts">
export interface SelectGroupProps extends PrimitiveProps {}

interface SelectGroupContext {
  id: string;
}

export const [injectSelectGroupContext, provideSelectGroupContext] = createContext<SelectGroupContext>('SelectGroup');

const props = defineProps<SelectGroupProps>();

const id = useId(undefined, 'soybean-select-group');
provideSelectGroupContext({ id });
</script>

<template>
  <Primitive role="group" v-bind="props" :aria-labelledby="id">
    <slot />
  </Primitive>
</template>
