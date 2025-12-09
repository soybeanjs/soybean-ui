<script setup lang="ts">
import { SInput } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Disabled</h3>
    <div class="w-60 lt-md:w-auto">
      <SInput model-value="the input is disabled" disabled placeholder="Please input" />
    </div>
  </div>
</template>
