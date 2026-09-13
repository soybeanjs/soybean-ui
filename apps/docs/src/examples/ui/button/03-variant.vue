<script setup lang="ts">
import { SButton } from '@vean/ui';
import type { ButtonVariant } from '@vean/ui';

const variants: ButtonVariant[] = ['solid', 'pure', 'plain', 'outline', 'dashed', 'soft', 'ghost', 'link'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SButton v-for="variant in variants" :key="variant" color="destructive" :variant="variant">{{ variant }}</SButton>
  </div>
</template>
