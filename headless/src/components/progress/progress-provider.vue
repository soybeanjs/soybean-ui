<script setup lang="ts">
import { watchEffect } from 'vue';
import { progress } from './state';
import { useProgressProviderUi } from './context';
import type { ProgressProviderProps } from './types';

defineOptions({
  name: 'ProgressProvider'
});

const props = defineProps<ProgressProviderProps>();

const ui = useProgressProviderUi();

watchEffect(() => {
  progress.configure(props);
});
</script>

<template>
  <div :class="ui.root" style="display: none" data-soybean-progress>
    <div :class="ui.indicator" data-soybean-progress-bar></div>
  </div>
</template>
