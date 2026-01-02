<script setup lang="ts">
import { useCardUi } from './context';
import type { CardTitleRootProps } from './types';

defineOptions({
  name: 'CardTitleRoot'
});

defineProps<CardTitleRootProps>();

const cls = useCardUi('titleRoot');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
