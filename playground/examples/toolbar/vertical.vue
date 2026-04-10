<script setup lang="ts">
import { SToolbar, SToolbarButton, SToolbarSeparator, SToolbarToggleGroup, SToolbarToggleItem } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Vertical</h3>
    <SToolbar orientation="vertical">
      <SToolbarButton>Cut</SToolbarButton>
      <SToolbarButton>Copy</SToolbarButton>
      <SToolbarSeparator />
      <SToolbarToggleGroup orientation="vertical" :default-value="['left']" multiple>
        <SToolbarToggleItem value="left">Left</SToolbarToggleItem>
        <SToolbarToggleItem value="center">Center</SToolbarToggleItem>
        <SToolbarToggleItem value="right">Right</SToolbarToggleItem>
      </SToolbarToggleGroup>
    </SToolbar>
  </div>
</template>
