<script setup lang="ts">
import { SCard, STag } from '@ui';
import type { TagVariant } from '@ui';

const variants: TagVariant[] = ['solid', 'pure', 'outline', 'soft', 'ghost', 'raw'];
</script>

<template>
  <SCard title="Variant" split :ui="{ content: 'flex gap-3' }">
    <STag v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </STag>
  </SCard>
</template>
