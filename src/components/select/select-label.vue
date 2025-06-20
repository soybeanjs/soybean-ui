<script setup lang="ts">
import { computed } from 'vue';
import { useSelectGroupContext, useSelectThemeContext } from './context';
import type { SelectLabelProps } from './types';

defineOptions({
  name: 'SelectLabel'
});

const props = defineProps<SelectLabelProps>();

const { labelId } = useSelectGroupContext('SelectLabel');

const themeContext = useSelectThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.label, props.class]);
</script>

<template>
  <div v-bind="props" :id="labelId" :class="cls">
    <slot />
  </div>
</template>
