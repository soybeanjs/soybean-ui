<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SAlertDialogCancel, SButton, SIcon } from '@soybeanjs/ui';

const handleBeforeClose = () => {
  console.log(5, 'handleBeforeClose');
  return true;
};
</script>

<template>
  <div>
    <h3 class="playground-title">Custom Action or Cancel Text</h3>
    <SAlertDialog title="Action" type="info" :trigger-props="{ as: 'a' }">
      <template #trigger>
        <SButton color="info" variant="outline">Show Dialog</SButton>
      </template>
      <p>Here is some action information for you</p>
      <template #footer>
        <SAlertDialogCancel text="Custom Cancel Text" :before-close="handleBeforeClose" />
        <SAlertDialogAction>
          <SIcon icon="lucide:check" />
          <span>Custom Action Text</span>
        </SAlertDialogAction>
      </template>
    </SAlertDialog>
  </div>
</template>
