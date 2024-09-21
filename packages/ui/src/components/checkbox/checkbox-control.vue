<script setup lang="ts">
import { computed } from 'vue';
import { CheckboxRoot, useForwardPropsEmits } from 'radix-vue';
import type { CheckboxRootEmits } from 'radix-vue';
import { checkboxVariants, cn } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { CheckboxControlProps } from './types';

defineOptions({
  name: 'SCheckboxControl'
});

const props = defineProps<CheckboxControlProps>();

const delegatedProps = computedOmit(props, ['class']);

const emit = defineEmits<CheckboxRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const cls = computed(() => {
  const { control } = checkboxVariants({ color: props.color, size: props.size });

  return cn(control(), props.class);
});
</script>

<template>
  <CheckboxRoot v-bind="forwarded" :class="cls">
    <slot />
  </CheckboxRoot>
</template>

<style scoped></style>
