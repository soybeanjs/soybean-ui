<script setup lang="ts">
import { useEmptyUi } from './context';
import type { EmptyDescriptionProps } from './types';

defineOptions({
  name: 'EmptyDescription'
});

defineProps<EmptyDescriptionProps>();

const cls = useEmptyUi('description');
</script>

<template>
  <p data-soybean-empty-description :class="cls">
    <slot />
  </p>
</template>
