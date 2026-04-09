<script setup lang="ts">
import { SToolbar, SToolbarButton, SToolbarSeparator } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <SToolbar>
      <SToolbarButton>Cut</SToolbarButton>
      <SToolbarButton>Copy</SToolbarButton>
      <SToolbarButton>Paste</SToolbarButton>
      <SToolbarSeparator />
      <SToolbarButton>Undo</SToolbarButton>
      <SToolbarButton>Redo</SToolbarButton>
    </SToolbar>
  </div>
</template>
