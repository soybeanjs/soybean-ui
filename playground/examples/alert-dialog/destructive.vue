<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SAlertDialogCancel, SButton } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Destructive</h3>
    <SAlertDialog>
      <template #trigger>
        <SButton color="destructive" variant="outline">Show Dialog</SButton>
      </template>
      <p>Here is some destructive information for you</p>
      <template #footer>
        <SAlertDialogCancel />
        <SAlertDialogAction />
      </template>
    </SAlertDialog>
  </div>
</template>
