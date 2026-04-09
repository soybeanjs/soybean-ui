<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import SIcon from '../icon/icon.vue';
import type { SpinnerProps } from './types';

defineOptions({
  name: 'SSpinner'
});

const props = withDefaults(defineProps<SpinnerProps>(), {
  icon: 'svg-spinners:270-ring'
});

const cls = computed(() => props.class);
const forwardedProps = useOmitProps(props, ['class']);
</script>

<template>
  <SIcon v-bind="forwardedProps" :class="cls" />
</template>
