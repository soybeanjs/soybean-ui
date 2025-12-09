<script setup lang="ts">
import { SButton, SDialog, SDialogClose } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Prevent Close</h3>
    <SDialog
      title="Dialog Title"
      @pointer-down-outside="e => e.preventDefault()"
      @escape-key-down="e => e.preventDefault()"
    >
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
