<script setup lang="ts">
import { SxFolder } from '@soybeanjs/ui-x';
</script>

<template>
  <SxFolder name="Documents" :count="5" :default-open="true">
    <div class="space-y-1">
      <div class="text-sm">resume.pdf</div>
      <div class="text-sm">budget.xlsx</div>
      <div class="text-sm">notes.md</div>
    </div>
  </SxFolder>
</template>
