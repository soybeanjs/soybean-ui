<script setup lang="ts">
import { SEllipsis } from '@soybeanjs/ui';
</script>

<template>
  <div class="flex flex-col gap-6">
    <SEllipsis as="div" class="w-40 text-sm">Rendered as a block element via the polymorphic as prop.</SEllipsis>
    <SEllipsis class="w-40 text-lg font-semibold">
      Custom class applies typography while keeping truncation behavior.
    </SEllipsis>
  </div>
</template>
