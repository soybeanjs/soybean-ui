<script setup lang="ts">
import { SClipboard } from '@soybeanjs/ui';

const value = 'icon-only-example';
</script>

<template>
  <SClipboard :value="value" only-icon color="accent" variant="soft" shape="square" />
</template>
