<script setup lang="ts">
import { usePopconfirmUi } from './context';
import type { PopconfirmHeaderProps } from './types';

defineOptions({
  name: 'PopconfirmHeader'
});

defineProps<PopconfirmHeaderProps>();

const cls = usePopconfirmUi('header');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
