<script setup lang="ts">
import { computed } from 'vue';
import { Label } from '../label';
import { useRadioGroupItemContext, useRadioGroupThemeContext } from './context';
import type { RadioGroupLabelProps } from './types';

defineOptions({
  name: 'RadioGroupLabel'
});

const props = defineProps<RadioGroupLabelProps>();

const themeContext = useRadioGroupThemeContext();

const cls = computed(() => themeContext?.ui?.value?.label);

const { controlId } = useRadioGroupItemContext('RadioGroupLabel');

const id = computed(() => props.for || controlId.value);
</script>

<template>
  <Label :for="id" :class="cls">
    <slot />
  </Label>
</template>
