<script setup lang="ts">
import { computed } from 'vue';
import { SwitchRoot, useForwardPropsEmits } from 'radix-vue';
import type { SwitchRootEmits } from 'radix-vue';
import { cn, switchVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SwitchRootProps } from './types';

defineOptions({
  name: 'SSwitchRoot'
});

const props = defineProps<SwitchRootProps>();

const delegatedProps = computedOmit(props, ['class', 'color', 'size']);

const emit = defineEmits<SwitchRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const cls = computed(() => {
  const { root } = switchVariants({ color: props.color, size: props.size });

  return cn(root(), props.class);
});
</script>

<template>
  <SwitchRoot :class="cls" v-bind="forwarded">
    <slot />
  </SwitchRoot>
</template>

<style scoped></style>
