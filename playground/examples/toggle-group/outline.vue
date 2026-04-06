<script setup lang="ts">
import { SToggleGroup, SToggleGroupItem } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Outline</h3>
    <div class="flex flex-wrap gap-3">
      <SToggleGroup variant="outline" default-value="preview">
        <SToggleGroupItem value="preview">Preview</SToggleGroupItem>
        <SToggleGroupItem value="code">Code</SToggleGroupItem>
        <SToggleGroupItem value="copy" disabled>Disabled</SToggleGroupItem>
      </SToggleGroup>
    </div>
  </div>
</template>
