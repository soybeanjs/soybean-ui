<script setup lang="ts">
import { SButton, SCard, SDialog, SDialogClose } from '@ui';

defineOptions({
  name: 'DemoDialogFooter'
});
</script>

<template>
  <SCard title="With Footer" split>
    <SDialog title="Dialog Title">
      <template #trigger>
        <SButton variant="outline">Open</SButton>
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
