<script setup lang="ts">
import type { NumberFieldRootEmits, NumberFieldRootProps } from 'radix-vue';
import { NumberFieldRoot, useForwardPropsEmits } from 'radix-vue';
import { type HTMLAttributes, computed } from 'vue';
import { cn } from '@ui/lib/utils';

const props = defineProps<NumberFieldRootProps & { class?: HTMLAttributes['class'] }>();
const emit = defineEmits<NumberFieldRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <NumberFieldRoot v-bind="forwarded" :class="cn('grid gap-1.5', props.class)">
    <slot />
  </NumberFieldRoot>
</template>
