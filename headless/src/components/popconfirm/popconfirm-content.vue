<script setup lang="ts">
import { usePopconfirmUi } from './context';
import type { PopconfirmContentProps } from './types';

defineOptions({
  name: 'PopconfirmContent'
});

defineProps<PopconfirmContentProps>();

const cls = usePopconfirmUi('content');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
