<script setup lang="ts">
import { ref } from 'vue';
import { SAlertDialog, SAlertDialogAction, SAlertDialogCancel, SButton, SCard } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';
import ThemeSizeToggler from '../components/theme-size-toggler.vue';

defineOptions({
  name: 'DemoAlertDialog'
});

const size = ref<ThemeSize>('md');
</script>

<template>
  <SCard title="Alert Dialog">
    <template #extra>
      <ThemeSizeToggler v-model:size="size" class="w-40" />
    </template>
    <div class="flex-c gap-4">
      <SCard title="Destructive" split>
        <SAlertDialog title="Are you sure delete?" type="destructive" :size="size">
          <template #trigger>
            <SButton color="destructive" variant="outline">Show Dialog</SButton>
          </template>
          <p>This action will delete all data</p>
          <template #footer>
            <SAlertDialogCancel :size="size" />
            <SAlertDialogAction :size="size" />
          </template>
        </SAlertDialog>
      </SCard>
      <SCard title="Success" split>
        <SAlertDialog title="Congratulations" type="success" :size="size">
          <template #trigger>
            <SButton color="success" variant="outline">Show Dialog</SButton>
          </template>
          <p>You have successfully completed the task</p>
          <template #footer>
            <SAlertDialogAction :size="size" />
          </template>
        </SAlertDialog>
      </SCard>
      <SCard title="Warning" split>
        <SAlertDialog title="Warning" type="warning" :size="size">
          <template #trigger>
            <SButton color="warning" variant="outline">Show Dialog</SButton>
          </template>
          <p>Be careful with this action</p>
          <template #footer>
            <SAlertDialogCancel :size="size" />
            <SAlertDialogAction :size="size" />
          </template>
        </SAlertDialog>
      </SCard>
      <SCard title="Info" split>
        <SAlertDialog title="Information" type="info" :size="size">
          <template #trigger>
            <SButton color="info" variant="outline">Show Dialog</SButton>
          </template>
          <p>Here is some information for you</p>
          <template #footer>
            <SAlertDialogAction :size="size" />
          </template>
        </SAlertDialog>
      </SCard>
    </div>
  </SCard>
</template>
