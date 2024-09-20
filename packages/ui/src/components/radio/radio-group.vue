<script setup lang="ts">
import { computed } from 'vue';
import { RadioGroupRoot, useForwardPropsEmits } from 'radix-vue';
import type { RadioGroupRootEmits } from 'radix-vue';
import { cn, radioVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { RadioGroupProps } from './types';
import SRadio from './radio.vue';

defineOptions({
  name: 'SCheckboxGroup'
});

const props = defineProps<RadioGroupProps>();

const delegatedProps = computedOmit(props, ['class', 'color', 'items']);

const emit = defineEmits<RadioGroupRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const cls = computed(() => {
  const { group } = radioVariants({ orientation: props.orientation });

  return cn(group(), props.class);
});
</script>

<template>
  <RadioGroupRoot v-bind="forwarded" :class="cls">
    <slot>
      <SRadio v-for="item in items" :key="item.value" v-bind="item" :color="color" />
    </slot>
  </RadioGroupRoot>
</template>

<style scoped></style>
