<script setup lang="ts">
import { SClipboard } from '@soybeanjs/ui';

const value = 'pnpm add @soybeanjs/ui';
</script>

<template>
  <h3 class="playground-title">Basic</h3>
  <SClipboard :value="value" color="accent" variant="soft" copy-text="Copy install command" copied-text="Copied install command" />
</template>
