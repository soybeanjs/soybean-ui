<script setup lang="ts">
import { SInput, SLabel } from '@soybeanjs/ui';
</script>

<template>
  <div class="grid gap-1.5">
    <SLabel html-for="email">Email</SLabel>
    <SInput id="email" type="email" placeholder="Email" />
  </div>
</template>
