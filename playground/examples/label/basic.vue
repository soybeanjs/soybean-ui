<script setup lang="ts">
import { SInput, SLabel } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="grid gap-1.5">
      <SLabel htmlFor="email">Email</SLabel>
      <SInput id="email" type="email" placeholder="Email" />
    </div>
  </div>
</template>
