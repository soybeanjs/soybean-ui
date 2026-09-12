<script setup lang="ts">
import { ref } from 'vue';
import { SDrawer, SButton } from '@soybeanjs/ui';
import type { Side } from '@soybeanjs/ui';

const sides: Side[] = ['left', 'right', 'top', 'bottom'];

const open = ref<Record<Side, boolean>>({ left: false, right: false, top: false, bottom: false });
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SButton v-for="side in sides" :key="side" variant="pure" @click="open[side] = true">
      {{ side }}
    </SButton>

    <SDrawer
      v-for="side in sides"
      :key="`drawer-${side}`"
      v-model:open="open[side]"
      :side="side"
      :title="`Side: ${side}`"
      description="The panel enters from the edge set by `side`; RTL mirrors the horizontal sides."
    >
      <div v-for="i in 20" :key="i" class="h-8">Item {{ i }}</div>

      <template #footer="{ close }">
        <SButton @click="close">Confirm</SButton>
      </template>
    </SDrawer>
  </div>
</template>
