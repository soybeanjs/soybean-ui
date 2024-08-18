<script setup lang="ts">
// import { useForwardPropsEmits } from 'radix-vue';
// import type { CheckboxRootEmits } from 'radix-vue';
import type { CheckboxGroupItemProps } from './types';
import SCheckbox from './checkbox.vue';

defineOptions({
  name: 'SCheckboxGroupItem'
});

defineProps<CheckboxGroupItemProps>();

// const emit = defineEmits<CheckboxRootEmits>();
</script>

<template>
  <SCheckbox v-bind="itemProps">
    <slot />
  </SCheckbox>
</template>

<style scoped></style>
