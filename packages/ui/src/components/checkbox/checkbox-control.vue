<script setup lang="ts">
import { computed } from 'vue';
import { CheckboxRoot, useForwardProps } from 'radix-vue';
import { checkboxVariants, cn } from '@soybean-ui/variants';
import type { CheckboxControlEmits, CheckboxControlProps } from './types';

defineOptions({
  name: 'SCheckboxControl'
});

const { class: cls, color, size, modelValue, defaultValue, ...delegatedProps } = defineProps<CheckboxControlProps>();

const emit = defineEmits<CheckboxControlEmits>();

const forwarded = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { control } = checkboxVariants({ color, size });

  return cn(control(), cls);
});
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :checked="modelValue"
    :default-checked="defaultValue"
    :class="mergedCls"
    @update:checked="emit('update:modelValue', $event)"
  >
    <slot />
  </CheckboxRoot>
</template>

<style scoped></style>
