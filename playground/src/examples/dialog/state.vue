<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SDialog } from '@ui';

defineOptions({
  name: 'DemoDialogState'
});

const open = ref(false);
</script>

<template>
  <SCard title="State" description="Control open state" split>
    <SDialog v-model:open="open" title="Dialog Title">
      <template #trigger>
        <SButton variant="outline">Open</SButton>
      </template>
      <div>Dialog Content</div>
    </SDialog>
  </SCard>
</template>
