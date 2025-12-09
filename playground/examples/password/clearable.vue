<script setup lang="ts">
import { SPassword } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Clearable</h3>
    <div class="w-60 lt-md:w-auto">
      <SPassword default-value="abc123" clearable />
    </div>
  </div>
</template>
