<script setup lang="ts">
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

const { control } = checkboxVariants();
</script>

<template>
  <CheckboxRoot v-bind="forwarded" :class="cn(control(), props.class)">
    <slot />
  </CheckboxRoot>
</template>

<style scoped></style>
