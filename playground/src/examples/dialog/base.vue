<script setup lang="ts">
import { SButton, SCard, SDialog } from '@ui';
</script>

<template>
  <SCard title="Base" split>
    <SDialog title="Dialog Title" description="Dialog Description">
      <template #trigger>
        <SButton variant="pure">Open</SButton>
      </template>
      <div>Dialog Content</div>
    </SDialog>
  </SCard>
</template>
