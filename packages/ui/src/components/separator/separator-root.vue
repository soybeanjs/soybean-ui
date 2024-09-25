<script setup lang="ts">
import { computed } from 'vue';
import { Separator, useForwardProps } from 'radix-vue';
import { cn, separatorVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SeparatorRootProps } from './types';

defineOptions({
  name: 'SSeparatorRoot'
});

const props = defineProps<SeparatorRootProps>();

const delegatedProps = computedOmit(props, ['class', 'border']);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { orientation, border } = props;

  const { root } = separatorVariants({ orientation, border });

  return cn(root(), props.class);
});
</script>

<template>
  <Separator v-bind="forwardedProps" :class="cls">
    <slot />
  </Separator>
</template>

<style scoped></style>
