<script setup lang="ts">
import { SSeparator } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Border</h3>
    <div class="flex-c gap-4">
      <SSeparator label="Solid" border="solid" />
      <SSeparator label="Dashed" border="dashed" />
      <SSeparator label="Dotted" border="dotted" />
    </div>
  </div>
</template>
