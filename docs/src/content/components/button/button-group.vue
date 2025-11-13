<script setup lang="ts">
import { SButton, SButtonGroup } from '@soybeanjs/ui';
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3>按钮组</h3>
      <div class="flex gap-2 flex-wrap">
        <SButtonGroup>
          <SButton>One</SButton>
          <SButton>Two</SButton>
          <SButton>Three</SButton>
        </SButtonGroup>

        <SButtonGroup>
          <SButton variant="outline">1</SButton>
          <SButton variant="outline">2</SButton>
          <SButton variant="outline">3</SButton>
        </SButtonGroup>
      </div>
    </div>
  </div>
</template>
