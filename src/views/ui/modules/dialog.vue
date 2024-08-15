<script setup lang="ts">
import { SButton, SDialog, SDialogClose } from '@soybean-unify/ui';

defineOptions({
  name: 'UiDialog'
});
</script>

<template>
  <div class="flex flex-wrap gap-12px">
    <SDialog title="Dialog Title">
      <template #trigger>
        <SButton>Open</SButton>
      </template>
      <div>Dialog Content</div>
    </SDialog>
    <SDialog title="Dialog Title">
      <template #trigger>
        <SButton>Open</SButton>
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

<style scoped></style>
