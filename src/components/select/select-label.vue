<script setup lang="ts">
import { useSelectGroupContext } from './context';
import type { SelectLabelProps } from './types';

defineOptions({
  name: 'SelectLabel'
});

const props = defineProps<SelectLabelProps>();

const { groupId } = useSelectGroupContext('SelectLabel');
</script>

<template>
  <div v-bind="props" :id="groupId">
    <slot />
  </div>
</template>
