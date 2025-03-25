<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SDialog, SDialogClose } from 'soy-ui';

defineOptions({
  name: 'DemoDialog'
});

const open = ref(false);

function closeDialog() {
  open.value = false;
}
</script>

<template>
  <SCard title="Dialog">
    <div class="flex-c gap-4">
      <SCard title="Default" split>
        <SDialog title="Dialog Title">
          <template #trigger>
            <SButton variant="outline">Open</SButton>
          </template>
          <div>Dialog Content</div>
        </SDialog>
      </SCard>
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
      <SCard title="Control Open State" split>
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
      </SCard>
      <SCard title="Disabled close when click outside or press escape key" split>
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
      </SCard>
    </div>
  </SCard>
</template>
