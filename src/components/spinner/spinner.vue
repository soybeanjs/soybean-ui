<script setup lang="ts">
import SIcon from '../icon/icon.vue';
import type { SpinnerProps } from './types';

defineOptions({
  name: 'SSpinner'
});

const props = withDefaults(defineProps<SpinnerProps>(), {
  icon: 'svg-spinners:270-ring'
});
</script>

<template>
  <SIcon v-bind="props" />
</template>
