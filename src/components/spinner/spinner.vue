<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import SIcon from '../icon/icon.vue';
import type { SpinnerProps } from './types';
import { spinnerVariants } from './variants';

defineOptions({
  name: 'SSpinner'
});

const props = withDefaults(defineProps<SpinnerProps>(), {
  icon: 'svg-spinners:270-ring'
});

const forwardedProps = useOmitProps(props, ['class', 'color', 'size']);

const cls = computed(() => cn(spinnerVariants({ color: props.color, size: props.size }), props.class));
</script>

<template>
  <SIcon v-bind="forwardedProps" :class="cls" />
</template>
