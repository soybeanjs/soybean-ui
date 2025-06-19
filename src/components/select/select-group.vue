<script setup lang="ts">
import { Primitive } from '../primitive';
import { provideSelectGroupContext } from './context';
import type { SelectGroupProps } from './types';

defineOptions({
  name: 'SelectGroup'
});

const props = defineProps<SelectGroupProps>();

const { groupId, initGroupId } = provideSelectGroupContext();

initGroupId();
</script>

<template>
  <Primitive v-bind="props" :aria-labelledby="groupId" role="group">
    <slot />
  </Primitive>
</template>
