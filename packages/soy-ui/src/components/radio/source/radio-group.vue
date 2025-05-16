<script setup lang="ts">
import { computed } from 'vue';
import { RadioGroupRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { RadioGroupRootEmits } from '@soybean-ui/primitives';
import { cn, radioVariants } from '@soybean-ui/variants';
import type { RadioGroupProps } from '../types';
import SRadio from './radio.vue';

defineOptions({
  name: 'SCheckboxGroup'
});

const { class: cls, color, size, ui, items, orientation, ...delegatedProps } = defineProps<RadioGroupProps>();

const emit = defineEmits<RadioGroupRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { group } = radioVariants({ size, orientation });

  return cn(group(), cls || ui?.root);
});
</script>

<template>
  <RadioGroupRoot v-bind="forwarded" :class="mergedCls" :orientation="orientation">
    <slot>
      <SRadio v-for="item in items" :key="item.value" v-bind="item" :color="color" :size="size" :ui="ui" />
    </slot>
  </RadioGroupRoot>
</template>
