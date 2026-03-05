<script setup lang="ts">
import { useFormFieldUi } from './context';
import type { FormControlProps } from './types';

defineOptions({
  name: 'FormControl'
});

defineProps<FormControlProps>();

const cls = useFormFieldUi('control');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
