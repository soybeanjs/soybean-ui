<script setup lang="ts">
import { computed } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { CheckboxRoot, useForwardPropsEmits } from 'radix-vue';
import type { CheckboxRootEmits } from 'radix-vue';
import { checkboxVariants, cn } from '@soybean-unify/ui-variants';
import type { CheckboxControlProps } from './types';

defineOptions({
  name: 'SCheckboxControl'
});

const props = defineProps<CheckboxControlProps>();

const delegatedProps = reactiveOmit(props, ['class']);

const emit = defineEmits<CheckboxRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const cls = computed(() => {
  const { control } = checkboxVariants({ color: props.color });

  return cn(control(), props.class);
});
</script>

<template>
  <CheckboxRoot v-bind="forwarded" :class="cls">
    <slot />
  </CheckboxRoot>
</template>

<style scoped></style>
