<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SAlertDialogCancel, SButton, SIcon } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Custom Action or Cancel Text</h3>
    <SAlertDialog title="Action" type="info">
      <template #trigger>
        <SButton color="info" variant="outline">Show Dialog</SButton>
      </template>
      <p>Here is some action information for you</p>
      <template #footer>
        <SAlertDialogCancel text="Custom Cancel Text" />
        <SAlertDialogAction>
          <SIcon icon="lucide:check" />
          <span>Custom Action Text</span>
        </SAlertDialogAction>
      </template>
    </SAlertDialog>
  </div>
</template>
