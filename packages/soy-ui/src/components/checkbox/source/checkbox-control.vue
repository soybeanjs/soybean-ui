<script setup lang="ts">
import { computed } from 'vue';
import { CheckboxRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import { checkboxVariants, cn } from '@soybean-ui/variants';
import type { CheckboxControlEmits, CheckboxControlProps } from '../types';

defineOptions({
  name: 'SCheckboxControl'
});

const { class: cls, color, size, ...delegatedProps } = defineProps<CheckboxControlProps>();

const emit = defineEmits<CheckboxControlEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { control } = checkboxVariants({ color, size });

  return cn(control(), cls);
});
</script>

<template>
  <CheckboxRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </CheckboxRoot>
</template>
