<script setup lang="ts">
import { computed } from 'vue';
import { useFormUi, useFormFieldUi } from './context';
import { mergeClasses } from './shared';
import type { FormControlProps } from './types';

defineOptions({
  name: 'FormControl'
});

defineProps<FormControlProps>();

const formCls = useFormUi('control');
const fieldCls = useFormFieldUi('control');

const cls = computed(() => mergeClasses(formCls.value, fieldCls.value));
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
