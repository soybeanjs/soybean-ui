<script setup lang="ts">
import { watchEffect } from 'vue';
import { progress } from './state';
import { useProgressProviderUi } from './context';
import { useLocaleMessages } from '../../locale';
import type { ProgressProviderProps } from './types';

defineOptions({
  name: 'ProgressProvider'
});

const props = defineProps<ProgressProviderProps>();

const ui = useProgressProviderUi();
const messages = useLocaleMessages();

watchEffect(() => {
  progress.configure(props);
});
</script>

<template>
  <div
    :class="ui.root"
    role="progressbar"
    :aria-label="messages.progress.loading"
    aria-valuemin="0"
    aria-valuemax="1"
    style="display: none"
    data-soybean-progress
  >
    <div :class="ui.indicator" data-soybean-progress-bar></div>
  </div>
</template>
