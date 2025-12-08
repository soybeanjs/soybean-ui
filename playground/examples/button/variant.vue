<script setup lang="ts">
import { SButton, SCard } from '@soybeanjs/ui';
import type { ButtonVariant } from '@soybeanjs/ui';

const variants: ButtonVariant[] = ['solid', 'pure', 'plain', 'outline', 'dashed', 'soft', 'ghost', 'link'];
</script>

<template>
  <SCard title="Variant" split>
    <div class="flex flex-wrap gap-3">
      <SButton v-for="variant in variants" :key="variant" color="destructive" :variant="variant">{{ variant }}</SButton>
    </div>
  </SCard>
</template>
