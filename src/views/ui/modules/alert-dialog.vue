<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SAlertDialogCancel, SButton } from '@soybean-ui/vue';

defineOptions({
  name: 'UiAlertDialog'
});
</script>

<template>
  <div class="py-12px text-18px">Destructive</div>
  <SAlertDialog title="Are you sure delete?" type="destructive">
    <template #trigger>
      <SButton color="destructive" variant="outline">Show Dialog</SButton>
    </template>
    <p>This action will delete all data</p>
    <template #footer>
      <SAlertDialogCancel />
      <SAlertDialogAction />
    </template>
  </SAlertDialog>
  <div class="py-12px text-18px">Success</div>
  <SAlertDialog title="Congratulations" type="success">
    <template #trigger>
      <SButton variant="outline">Show Dialog</SButton>
    </template>
    <p>You have successfully completed the task</p>
    <template #footer>
      <SAlertDialogAction />
    </template>
  </SAlertDialog>
  <div class="py-12px text-18px">Warning</div>
  <SAlertDialog title="Warning" type="warning">
    <template #trigger>
      <SButton color="warning" variant="outline">Show Dialog</SButton>
    </template>
    <p>Be careful with this action</p>
    <template #footer>
      <SAlertDialogCancel />
      <SAlertDialogAction />
    </template>
  </SAlertDialog>
  <div class="py-12px text-18px">Info</div>
  <SAlertDialog title="Information" type="info">
    <template #trigger>
      <SButton color="info" variant="outline">Show Dialog</SButton>
    </template>
    <p>Here is some information for you</p>
    <template #footer>
      <SAlertDialogAction />
    </template>
  </SAlertDialog>
</template>

<style scoped></style>
