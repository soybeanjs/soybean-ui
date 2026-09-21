<script setup lang="ts">
import { SButton, SSheet } from '@vean/ui';
import type { Side } from '@vean/ui';

const sides: Side[] = ['left', 'right', 'top', 'bottom'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SSheet v-for="side in sides" :key="side" :title="`Side: ${side}`" :side="side" description="Drawer Description">
      <template #trigger>
        <SButton variant="pure">{{ side }}</SButton>
      </template>
      <div>Drawer Content</div>
      <template #footer="{ close }">
        <SButton @click="close">Confirm</SButton>
      </template>
    </SSheet>
  </div>
</template>
