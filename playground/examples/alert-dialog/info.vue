<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SButton } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Info</h3>
    <SAlertDialog title="Information" type="info">
      <template #trigger>
        <SButton color="info" variant="outline">Show Dialog</SButton>
      </template>
      <p>Here is some information for you</p>
      <template #footer>
        <SAlertDialogAction />
      </template>
    </SAlertDialog>
  </div>
</template>
