<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { CheckboxRoot, useForwardPropsEmits } from 'radix-vue';
import type { CheckboxRootEmits } from 'radix-vue';
import { checkboxVariants, cn } from '@soybean-unify/ui-variants';
import type { CheckboxRootProps } from './types';

defineOptions({
  name: 'SCheckboxRoot'
});

const props = defineProps<CheckboxRootProps>();

const delegatedProps = reactiveOmit(props, ['class']);

const emit = defineEmits<CheckboxRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { root } = checkboxVariants();
</script>

<template>
  <CheckboxRoot v-bind="forwarded" :class="cn(root(), props.class)">
    <slot />
  </CheckboxRoot>
</template>

<style scoped></style>
