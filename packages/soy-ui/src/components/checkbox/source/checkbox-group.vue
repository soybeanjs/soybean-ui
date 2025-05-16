<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { useForwardPropsEmits } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { CheckboxGroupEmits, CheckboxGroupProps } from '../types';
import SCheckboxGroupRoot from './checkbox-group-root.vue';
import SCheckbox from './checkbox.vue';

defineOptions({
  name: 'SCheckboxGroup'
});

const { items, ...delegatedProps } = defineProps<CheckboxGroupProps<T>>();

const emit = defineEmits<CheckboxGroupEmits<T>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <SCheckboxGroupRoot v-bind="forwarded">
    <slot>
      <SCheckbox
        v-for="(item, index) in items"
        :key="index"
        v-bind="item"
        :color="color"
        :size="size"
        :disabled="disabled || item.disabled"
      />
    </slot>
  </SCheckboxGroupRoot>
</template>
