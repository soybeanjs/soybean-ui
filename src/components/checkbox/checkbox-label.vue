<script setup lang="ts">
import { computed } from 'vue';
import { Label } from '../label';
import { useCheckboxRootContext, useCheckboxThemeContext } from './context';
import type { CheckboxLabelProps } from './types';

defineOptions({
  name: 'CheckboxLabel'
});

const props = defineProps<CheckboxLabelProps>();

const themeContext = useCheckboxThemeContext();

const cls = computed(() => themeContext?.ui?.value?.label);

const { controlId } = useCheckboxRootContext('CheckboxLabel');

const id = computed(() => props.for || controlId.value);
</script>

<template>
  <Label :for="id" :class="cls">
    <slot />
  </Label>
</template>
