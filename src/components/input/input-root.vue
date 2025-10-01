<script setup lang="ts">
import { computed } from 'vue';
import { useInputThemeContext } from './context';
import type { InputRootProps } from './types';

defineOptions({
  name: 'InputRoot'
});

const props = defineProps<InputRootProps>();

const themeContext = useInputThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);
</script>

<template>
  <div v-bind="props" :class="cls">
    <slot />
  </div>
</template>
