<script setup lang="ts">
import { SButton, SCard, SDialogPure } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Pure" description="Pure dialog" split>
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
  </SCard>
</template>
