<script setup lang="ts">
import { computed } from 'vue';
import { provideSelectGroupContext, useSelectThemeContext } from './context';
import type { SelectGroupProps } from './types';

defineOptions({
  name: 'SelectGroup'
});

defineProps<SelectGroupProps>();

const { labelId, initLabelId } = provideSelectGroupContext();

const themeContext = useSelectThemeContext();

const cls = computed(() => themeContext?.ui?.value?.group);

initLabelId();
</script>

<template>
  <div :class="cls" :aria-labelledby="labelId" role="group">
    <slot />
  </div>
</template>
