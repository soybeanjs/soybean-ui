<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SDialog, SDialogClose } from '@soybean-unify/ui';

defineOptions({
  name: 'UiDialog'
});

const open = ref(false);

function closeDialog() {
  open.value = false;
}
</script>

<template>
  <div class="py-12px text-18px">Default</div>
  <SDialog title="Dialog Title">
    <template #trigger>
      <SButton variant="outline">Open</SButton>
    </template>
    <div>Dialog Content</div>
  </SDialog>
  <div class="py-12px text-18px">With Footer</div>
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
  <div class="py-12px text-18px">Control Open State</div>
  <SDialog v-model:open="open" title="Dialog Title">
    <template #trigger>
      <SButton variant="outline">Open</SButton>
    </template>
    <div>Dialog Content</div>
    <template #footer>
      <SButton variant="plain" @click="closeDialog">Cancel</SButton>
      <SButton @click="closeDialog">Confirm</SButton>
    </template>
  </SDialog>
  <div class="py-12px text-18px">Disabled close when click outside or press escape key</div>
  <SDialog
    title="Dialog Title"
    @pointer-down-outside="e => e.preventDefault()"
    @escape-key-down="e => e.preventDefault()"
  >
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
</template>

<style scoped></style>
