<script setup lang="ts">
import { SButton, SDialogPure } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Pure Dialog</h3>
    <SDialogPure>
      <template #trigger>
        <SButton variant="pure">Open</SButton>
      </template>
      <div>
        <p>Pure Dialog</p>
        <p>no Header and Footer</p>
        <p>no Title and Description</p>
      </div>
    </SDialogPure>
  </div>
</template>
