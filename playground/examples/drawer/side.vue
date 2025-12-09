<script setup lang="ts">
import { SButton, SDrawer } from '@soybeanjs/ui';
import type { Side } from '@soybeanjs/ui';

const sides: Side[] = ['left', 'right', 'top', 'bottom'];
</script>

<template>
  <div>
    <h3 class="playground-title">Drawer Side</h3>
    <div class="flex flex-wrap gap-3">
      <SDrawer v-for="side in sides" :key="side" :title="`Side: ${side}`" :side="side" description="Drawer Description">
        <template #trigger>
          <SButton variant="pure">{{ side }}</SButton>
        </template>
        <div>Drawer Content</div>
        <template #footer="{ close }">
          <SButton @click="close">Confirm</SButton>
        </template>
      </SDrawer>
    </div>
  </div>
</template>
