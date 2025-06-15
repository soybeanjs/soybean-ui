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

const cls = computed(() => [themeContext?.ui?.value?.label, props.class]);

const { controlId } = useRadioGroupItemContext('RadioGroupLabel');
</script>

<template>
  <Label v-bind="props" :for="props.for || controlId" :class="cls">
    <slot />
  </Label>
</template>
