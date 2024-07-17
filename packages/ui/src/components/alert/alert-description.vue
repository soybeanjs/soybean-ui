<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../shared';

defineOptions({
  name: 'SAlertDescription'
});

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn('text-sm [&_p]:leading-relaxed', props.class)">
    <slot />
  </div>
</template>

<style scoped></style>
