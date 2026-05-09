<script setup lang="ts">
import { usePopconfirmUi } from './context';
import type { PopconfirmDescriptionProps } from './types';

defineOptions({
  name: 'PopconfirmDescription'
});

defineProps<PopconfirmDescriptionProps>();

const cls = usePopconfirmUi('description');
</script>

<template>
  <p :class="cls">
    <slot />
  </p>
</template>
