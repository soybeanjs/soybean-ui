<script setup lang="ts">
import { useColorSwatchUi } from './context';
import type { ColorSwatchCheckerProps } from './types';

defineOptions({
  name: 'ColorSwatchChecker'
});

defineProps<ColorSwatchCheckerProps>();

const cls = useColorSwatchUi('checker');
</script>

<template>
  <span :class="cls"></span>
</template>
