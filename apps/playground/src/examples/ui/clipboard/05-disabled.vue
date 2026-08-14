<script setup lang="ts">
import { SClipboard } from '@soybeanjs/ui';

const value = 'disabled-example';
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SClipboard :value="value" color="accent" variant="soft" copy-text="Enabled" copied-text="Copied" />
    <SClipboard :value="value" color="accent" variant="soft" copy-text="Disabled" copied-text="Copied" disabled />
  </div>
</template>
