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

const cls = computed(() => [themeContext?.ui?.value?.label, props.class]);

const { controlId } = useCheckboxRootContext('CheckboxLabel');
</script>

<template>
  <Label v-bind="props" :for="props.for || controlId" :class="cls">
    <slot />
  </Label>
</template>
