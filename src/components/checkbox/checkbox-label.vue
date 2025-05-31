<script setup lang="ts">
import { Label } from '../label';
import { useCheckboxRootContext } from './context';
import type { CheckboxLabelProps } from './types';

defineOptions({
  name: 'CheckboxLabel'
});

const props = defineProps<CheckboxLabelProps>();

const { controlId } = useCheckboxRootContext('CheckboxLabel');
</script>

<template>
  <Label v-bind="props" :for="props.for || controlId">
    <slot />
  </Label>
</template>
