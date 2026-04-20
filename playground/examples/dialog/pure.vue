<script setup lang="ts">
import { SButton, SDialog } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Pure Dialog</h3>
    <SDialog pure>
      <template #trigger>
        <SButton variant="pure">Open</SButton>
      </template>
      <div>
        <p>Pure Dialog</p>
        <p>no Header and Footer</p>
        <p>no Title and Description</p>
      </div>
    </SDialog>
  </div>
</template>
