<script setup lang="ts">
import { SButton, SDialog, SDialogClose } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">With Footer</h3>
    <SDialog title="Dialog Title">
      <template #trigger>
        <SButton variant="pure">Open</SButton>
      </template>
      <div>Dialog Content</div>
      <template #footer>
        <SDialogClose as-child>
          <SButton variant="plain">Cancel</SButton>
        </SDialogClose>
        <SButton>Confirm</SButton>
      </template>
    </SDialog>
  </div>
</template>
