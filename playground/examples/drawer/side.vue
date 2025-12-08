<script setup lang="ts">
import { SButton, SCard, SDrawer } from '@soybeanjs/ui';
import type { Side } from '@soybeanjs/ui';

const sides: Side[] = ['left', 'right', 'top', 'bottom'];
</script>

<template>
  <SCard title="Drawer Side" :ui="{ content: 'flex gap-3' }">
    <SDrawer v-for="side in sides" :key="side" :title="`Side: ${side}`" :side="side" description="Drawer Description">
      <template #trigger>
        <SButton variant="pure">{{ side }}</SButton>
      </template>
      <div>Drawer Content</div>
      <template #footer="{ close }">
        <SButton @click="close">Confirm</SButton>
      </template>
    </SDrawer>
  </SCard>
</template>
