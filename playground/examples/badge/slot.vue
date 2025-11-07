<script setup lang="ts">
import { SBadge, SButton, SCard } from '@ui';
</script>

<template>
  <SCard title="Slot" split>
    <SBadge>
      <template #content>New!</template>
      <SButton variant="pure">99+</SButton>
    </SBadge>
  </SCard>
</template>
