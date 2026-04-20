<script setup lang="ts">
import { SButton, SDialog } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">With Footer</h3>
    <SDialog title="Dialog Title" show-cancel show-confirm>
      <template #trigger>
        <SButton variant="pure">Open</SButton>
      </template>
      <div>Dialog Content</div>
    </SDialog>
  </div>
</template>
