<script setup lang="ts">
import { SClipboard } from '@vean/ui';

const value = 'pnpm add @vean/ui';
</script>

<template>
  <SClipboard
    :value="value"
    color="accent"
    variant="soft"
    copy-text="Copy install command"
    copied-text="Copied install command"
    class="w-fit"
  />
</template>
