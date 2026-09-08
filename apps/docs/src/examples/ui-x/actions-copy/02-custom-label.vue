<script setup lang="ts">
import { SxActionsCopy } from '@soybeanjs/ui-x';
</script>

<template>
  <SxActionsCopy text="Copy this sentence to your clipboard.">
    <template #label="{ copied }">{{ copied ? 'Copied!' : 'Copy sentence' }}</template>
  </SxActionsCopy>
</template>
