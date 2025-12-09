<script setup lang="ts">
import { STextarea } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Disabled</h3>
    <div class="w-80 lt-md:w-auto">
      <STextarea model-value="the textarea is disabled" disabled placeholder="Please input" />
    </div>
  </div>
</template>
