<script setup lang="ts">
import { SBadge, SButton } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Slot</h3>
    <SBadge>
      <template #content>New!</template>
      <SButton variant="pure">99+</SButton>
    </SBadge>
  </div>
</template>
