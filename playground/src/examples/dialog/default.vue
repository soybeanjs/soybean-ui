<script setup lang="ts">
import { SButton, SCard, SDialog } from '@ui';

defineOptions({
  name: 'DemoDialogDefault'
});
</script>

<template>
  <SCard title="Default" split>
    <SDialog title="Dialog Title" description="Dialog Description">
      <template #trigger>
        <SButton variant="outline">Open</SButton>
      </template>
      <div>Dialog Content</div>
    </SDialog>
  </SCard>
</template>
