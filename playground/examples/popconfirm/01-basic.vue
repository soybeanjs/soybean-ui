<script setup lang="ts">
import { SButton, SPopconfirm } from '@soybeanjs/ui';

function handleConfirm() {
  console.log('Confirmed!');
}

function handleCancel() {
  console.log('Cancelled!');
}
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <SPopconfirm
      title="Delete Item?"
      description="This action cannot be undone. Are you sure you want to delete this item?"
      type="destructive"
      :ui="{ description: 'max-w-50' }"
      :before-confirm="handleConfirm"
      :before-cancel="handleCancel"
    >
      <template #trigger>
        <SButton color="destructive">Delete</SButton>
      </template>
    </SPopconfirm>

    <SPopconfirm
      title="Confirm Action"
      description="Are you sure you want to proceed with this action?"
      type="info"
      :before-confirm="handleConfirm"
      :before-cancel="handleCancel"
    >
      <template #trigger>
        <SButton variant="outline">Info Confirm</SButton>
      </template>
    </SPopconfirm>

    <SPopconfirm
      title="Success!"
      description="Your changes have been saved successfully."
      type="success"
      confirm-text="Great!"
      :before-confirm="handleConfirm"
    >
      <template #trigger>
        <SButton variant="outline" class="border-success text-success hover:bg-success/10">Success</SButton>
      </template>
    </SPopconfirm>

    <SPopconfirm
      title="Warning!"
      description="This operation may affect other settings."
      type="warning"
      :before-confirm="handleConfirm"
      :before-cancel="handleCancel"
    >
      <template #trigger>
        <SButton variant="outline" class="border-warning text-warning hover:bg-warning/10">Warning</SButton>
      </template>
    </SPopconfirm>
  </div>
</template>
