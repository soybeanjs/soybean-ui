<script setup lang="ts">
import { useEmptyUi } from './context';
import type { EmptyRootProps } from './types';

defineOptions({
  name: 'EmptyRoot'
});

defineProps<EmptyRootProps>();

const cls = useEmptyUi('root');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
