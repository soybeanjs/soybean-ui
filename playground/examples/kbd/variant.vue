<script setup lang="ts">
import { SCard, SKbd } from '@ui';
import type { KbdVariant } from '@ui';

const variants: KbdVariant[] = ['solid', 'outline', 'ghost'];
</script>

<template>
  <SCard title="Variant" :ui="{ content: 'flex gap-2' }">
    <SKbd v-for="variant in variants" :key="variant" :variant="variant" value="command" />
  </SCard>
</template>
