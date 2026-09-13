<script setup lang="ts">
import { SKbd } from '@vean/ui';
import type { KbdVariant } from '@vean/ui';

const variants: KbdVariant[] = ['solid', 'outline', 'ghost'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SKbd v-for="variant in variants" :key="variant" :variant="variant" value="command" />
  </div>
</template>
