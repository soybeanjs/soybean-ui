<script setup lang="ts">
import { SButton, SButtonGroup } from '@soybeanjs/ui';
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3>按钮组</h3>
      <SButtonGroup variant="pure" color="accent" class="whitespace-nowrap mb-4">
        <SButton v-for="i in 5" :key="i">Button {{ i }}</SButton>
      </SButtonGroup>
      <SButtonGroup orientation="vertical" class="w-30" variant="outline" color="warning">
        <SButton v-for="i in 10" :key="i">Button {{ i }}</SButton>
      </SButtonGroup>
    </div>
  </div>
</template>
