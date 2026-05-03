<script setup lang="ts">
import { STag } from '@soybeanjs/ui';
import type { TagVariant } from '@soybeanjs/ui';

const variants: TagVariant[] = ['solid', 'pure', 'outline', 'soft', 'ghost', 'raw'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <STag v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </STag>
  </div>
</template>
