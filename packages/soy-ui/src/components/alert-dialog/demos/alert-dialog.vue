<script setup lang="ts">
import { SAlertDialog, SAlertDialogAction, SAlertDialogCancel, SButton, SCard } from 'soy-ui';

defineOptions({
  name: 'DemoAlertDialog'
});
</script>

<template>
  <SCard title="Alert Dialog">
    <div class="flex-c gap-4">
      <SCard title="Destructive" split>
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
      </SCard>
      <SCard title="Success" split>
        <SAlertDialog title="Congratulations" type="success">
          <template #trigger>
            <SButton color="success" variant="outline">Show Dialog</SButton>
          </template>
          <p>You have successfully completed the task</p>
          <template #footer>
            <SAlertDialogAction />
          </template>
        </SAlertDialog>
      </SCard>
      <SCard title="Warning" split>
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
      </SCard>
      <SCard title="Info" split>
        <SAlertDialog title="Information" type="info">
          <template #trigger>
            <SButton color="info" variant="outline">Show Dialog</SButton>
          </template>
          <p>Here is some information for you</p>
          <template #footer>
            <SAlertDialogAction />
          </template>
        </SAlertDialog>
      </SCard>
    </div>
  </SCard>
</template>
