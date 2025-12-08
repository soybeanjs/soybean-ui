<script setup lang="ts">
import { SCard, SKbd } from '@soybeanjs/ui';
import type { KbdVariant } from '@soybeanjs/ui';

const variants: KbdVariant[] = ['solid', 'outline', 'ghost'];
</script>

<template>
  <SCard title="Variant" :ui="{ content: 'flex gap-2' }">
    <SKbd v-for="variant in variants" :key="variant" :variant="variant" value="command" />
  </SCard>
</template>
