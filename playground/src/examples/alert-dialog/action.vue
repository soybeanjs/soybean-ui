<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SAlertDialogCancel, SButton, SCard, SIcon } from '@ui';

defineOptions({
  name: 'DemoAlertDialogAction'
});
</script>

<template>
  <SCard title="Action" description="Custom Action or Cancel Text" split>
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
  </SCard>
</template>
