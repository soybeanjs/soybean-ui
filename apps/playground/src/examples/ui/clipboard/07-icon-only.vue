<script setup lang="ts">
import { SClipboard } from '@soybeanjs/ui';

const value = 'icon-only-example';
</script>

<template>
  <SClipboard
    :value="value"
    color="accent"
    variant="outline"
    shape="square"
    aria-label="Copy icon-only example"
    copy-text="Copy icon-only example"
    copied-text="Copied icon-only example"
  >
    <template #default />
  </SClipboard>
</template>
