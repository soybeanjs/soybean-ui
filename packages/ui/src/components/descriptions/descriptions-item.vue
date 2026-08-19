<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { DescriptionsItem } from '@soybeanjs/headless/descriptions';
import type { DescriptionsItemProps } from './types';

defineOptions({
  name: 'SDescriptionsItem'
});

const props = withDefaults(defineProps<DescriptionsItemProps>(), {
  label: undefined,
  span: 1
});

const forwardedProps = useOmitProps(props, []);

const itemStyle = computed(() => (props.span > 1 ? { gridColumn: `span ${props.span}` } : undefined));
</script>

<template>
  <DescriptionsItem v-bind="forwardedProps" :style="itemStyle">
    <template #label>
      <slot name="label" />
    </template>
    <slot />
  </DescriptionsItem>
</template>
