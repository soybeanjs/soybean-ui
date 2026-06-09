<script setup lang="ts">
import { watchEffect } from 'vue';
import { useLocaleMessages } from '../../locale';
import { useProgressProviderUi } from './context';
import { progress } from './state';
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
    data-soybean-progress-provider
    :class="ui.root"
    role="progressbar"
    :aria-label="messages.progress.loading"
    aria-valuemin="0"
    aria-valuemax="1"
    style="display: none"
  >
    <div :class="ui.indicator" data-soybean-progress-bar></div>
  </div>
</template>
