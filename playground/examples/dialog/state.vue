<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SDialog } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <div>
    <h3 class="playground-title">State</h3>
    <SDialog v-model:open="open" title="Dialog Title">
      <template #trigger>
        <SButton variant="pure">Open</SButton>
      </template>
      <div>Dialog Content</div>
    </SDialog>
  </div>
</template>
