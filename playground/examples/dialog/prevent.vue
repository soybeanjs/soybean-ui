<script setup lang="ts">
import { SButton, SCard, SDialog, SDialogClose } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Prevent Close" description="Prevent close when click outside or press escape key" split>
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
  </SCard>
</template>
