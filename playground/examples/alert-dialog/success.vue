<script setup lang="ts">
import { SAlertDialog, SButton } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Success</h3>
    <SAlertDialog title="Success" type="success">
      <template #trigger>
        <SButton color="success" variant="outline">Show Dialog</SButton>
      </template>
      <p>Here is some success information for you</p>
    </SAlertDialog>
  </div>
</template>
