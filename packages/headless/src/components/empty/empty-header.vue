<script setup lang="ts">
import { useEmptyUi } from './context';
import type { EmptyHeaderProps } from './types';

defineOptions({
  name: 'EmptyHeader'
});

defineProps<EmptyHeaderProps>();

const cls = useEmptyUi('header');
</script>

<template>
  <div data-soybean-empty-header :class="cls">
    <slot />
  </div>
</template>
