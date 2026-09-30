<script setup lang="ts">
import { SBadge, SButton } from '@soybeanjs/ui';
</script>

<template>
  <div class="flex justify-center w-full">
    <SBadge class="max-w-2xl">
      <template #content>New!</template>
      <SButton variant="pure">99+</SButton>
    </SBadge>
  </div>
</template>
