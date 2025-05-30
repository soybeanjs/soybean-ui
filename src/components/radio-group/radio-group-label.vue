<script setup lang="ts">
import { Label } from '../label';
import { useRadioGroupItemContext } from './context';
import type { RadioGroupLabelProps } from './types';

defineOptions({
  name: 'RadioGroupLabel'
});

const props = defineProps<RadioGroupLabelProps>();

const { controlId } = useRadioGroupItemContext('RadioGroupLabel');
</script>

<template>
  <Label :for="props.for || controlId" :class="props.class">
    <slot />
  </Label>
</template>
