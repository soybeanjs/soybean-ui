<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SAlertDialogCancel, SButton, SCard } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Destructive" split>
    <SAlertDialog title="Destructive" type="destructive">
      <template #trigger>
        <SButton color="destructive" variant="outline">Show Dialog</SButton>
      </template>
      <p>Here is some destructive information for you</p>
      <template #footer>
        <SAlertDialogCancel />
        <SAlertDialogAction />
      </template>
    </SAlertDialog>
  </SCard>
</template>
