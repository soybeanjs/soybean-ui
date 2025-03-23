<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SDialog, SDialogClose } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';
import ThemeSizeToggler from '../components/theme-size-toggler.vue';

defineOptions({
  name: 'DemoDialog'
});

const open = ref(false);

function closeDialog() {
  open.value = false;
}

const size = ref<ThemeSize>('md');
</script>

<template>
  <SCard title="Dialog">
    <template #extra>
      <ThemeSizeToggler v-model:size="size" class="w-40" />
    </template>

    <div class="flex-c gap-4">
      <SCard title="Default" split>
        <SDialog title="Dialog Title" :size="size">
          <template #trigger>
            <SButton variant="outline">Open</SButton>
          </template>
          <div>Dialog Content</div>
        </SDialog>
      </SCard>
      <SCard title="With Footer" split>
        <SDialog title="Dialog Title" :size="size">
          <template #trigger>
            <SButton variant="outline">Open</SButton>
          </template>
          <div>Dialog Content</div>
          <template #footer>
            <SDialogClose as-child>
              <SButton :size="size" variant="plain">Cancel</SButton>
            </SDialogClose>
            <SButton :size="size">Confirm</SButton>
          </template>
        </SDialog>
      </SCard>
      <SCard title="Control Open State" split>
        <SDialog v-model:open="open" title="Dialog Title" :size="size">
          <template #trigger>
            <SButton variant="outline">Open</SButton>
          </template>
          <div>Dialog Content</div>
          <template #footer>
            <SButton :size="size" variant="plain" @click="closeDialog">Cancel</SButton>
            <SButton :size="size" @click="closeDialog">Confirm</SButton>
          </template>
        </SDialog>
      </SCard>
      <SCard title="Disabled close when click outside or press escape key" split>
        <SDialog
          title="Dialog Title"
          :size="size"
          @pointer-down-outside="e => e.preventDefault()"
          @escape-key-down="e => e.preventDefault()"
        >
          <template #trigger>
            <SButton variant="outline">Open</SButton>
          </template>
          <div>Dialog Content</div>
          <template #footer>
            <SDialogClose as-child>
              <SButton :size="size" variant="plain">Cancel</SButton>
            </SDialogClose>
            <SButton :size="size">Confirm</SButton>
          </template>
        </SDialog>
      </SCard>
    </div>
  </SCard>
</template>
