<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SDialog } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SCard title="State" description="Control open state" split>
    <SDialog v-model:open="open" title="Dialog Title">
      <template #trigger>
        <SButton variant="pure">Open</SButton>
      </template>
      <div>Dialog Content</div>
    </SDialog>
  </SCard>
</template>
