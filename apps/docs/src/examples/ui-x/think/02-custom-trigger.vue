<script setup lang="ts">
import { SxThink } from '@soybeanjs/ui-x';
</script>

<template>
  <SxThink title="Reasoning">
    <template #trigger="{ open }">{{ open ? 'Hide reasoning' : 'Show reasoning' }}</template>
    <p class="text-sm leading-6">
      The assistant breaks the question into steps: parse intent, retrieve context, and compose a concise answer.
    </p>
  </SxThink>
</template>
