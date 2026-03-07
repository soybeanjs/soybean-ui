<script setup lang="ts">
import { SAlertDialog, SButton } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Custom Confirm or Cancel Text</h3>
    <SAlertDialog title="Action" type="info" show-cancel confirm-text="ok" cancel-text="no">
      <template #trigger>
        <SButton color="info" variant="outline">Show Dialog</SButton>
      </template>
      <p>Here is some action information for you</p>
    </SAlertDialog>
  </div>
</template>
