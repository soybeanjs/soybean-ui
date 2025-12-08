<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SButton, SCard } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Info" split>
    <SAlertDialog title="Information" type="info">
      <template #trigger>
        <SButton color="info" variant="outline">Show Dialog</SButton>
      </template>
      <p>Here is some information for you</p>
      <template #footer>
        <SAlertDialogAction />
      </template>
    </SAlertDialog>
  </SCard>
</template>
