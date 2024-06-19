<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from 'radix-vue';
import { SelectRoot, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<SelectRootProps>();
const emit = defineEmits<SelectRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <SelectRoot v-bind="forwarded">
    <slot />
  </SelectRoot>
</template>
