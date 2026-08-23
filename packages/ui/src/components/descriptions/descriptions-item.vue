<script setup lang="ts">
import { computed } from 'vue';
import { DescriptionsItem } from '@soybeanjs/headless/descriptions';
import type { DescriptionsItemProps } from './types';

defineOptions({
  name: 'SDescriptionsItem'
});

const props = withDefaults(defineProps<DescriptionsItemProps>(), {
  label: undefined,
  span: 1
});

const itemStyle = computed(() => (props.span > 1 ? { gridColumn: `span ${props.span}` } : undefined));
</script>

<template>
  <DescriptionsItem v-bind="props" :style="itemStyle">
    <template #label>
      <slot name="label" />
    </template>
    <slot />
  </DescriptionsItem>
</template>
