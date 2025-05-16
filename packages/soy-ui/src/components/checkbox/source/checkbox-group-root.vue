<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { CheckboxGroupRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { checkboxVariants, cn } from '@soybean-ui/variants';
import type { CheckboxGroupRootEmits, CheckboxGroupRootProps } from '../types';

defineOptions({
  name: 'SCheckboxGroupRoot'
});

const { class: cls, size, orientation, ...delegatedProps } = defineProps<CheckboxGroupRootProps>();

const emit = defineEmits<CheckboxGroupRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { groupRoot } = checkboxVariants({ size, orientation });

  return cn(groupRoot(), cls);
});
</script>

<template>
  <CheckboxGroupRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </CheckboxGroupRoot>
</template>
