<script setup lang="ts">
import { SToolbar, SToolbarButton, SToolbarSeparator } from '@soybeanjs/ui';
</script>

<template>
  <SToolbar>
    <SToolbarButton>Cut</SToolbarButton>
    <SToolbarButton>Copy</SToolbarButton>
    <SToolbarButton>Paste</SToolbarButton>
    <SToolbarSeparator />
    <SToolbarButton>Undo</SToolbarButton>
    <SToolbarButton>Redo</SToolbarButton>
  </SToolbar>
</template>
