<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { CheckboxGroupRoot, useForwardPropsEmits } from 'reka-ui';
import type { AcceptableValue } from 'reka-ui';
import { checkboxVariants, cn } from '@soybean-ui/variants';
import type { CheckboxGroupRootEmits, CheckboxGroupRootProps } from './types';

defineOptions({
  name: 'SCheckboxGroupRoot'
});

const { class: cls, orientation, ...delegatedProps } = defineProps<CheckboxGroupRootProps>();

const emit = defineEmits<CheckboxGroupRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { groupRoot } = checkboxVariants({ orientation });

  return cn(groupRoot(), cls);
});
</script>

<template>
  <CheckboxGroupRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </CheckboxGroupRoot>
</template>
