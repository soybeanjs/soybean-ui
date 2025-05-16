<script setup lang="ts">
import { SButton, SCard, SScrollArea, SSheet } from 'soy-ui';
import type { SheetSide } from 'soy-ui';

defineOptions({
  name: 'DemoSheet'
});

const sides: SheetSide[] = ['left', 'right', 'top', 'bottom'];
</script>

<template>
  <SCard title="Sheet">
    <div class="flex-c gap-4">
      <SCard title="Side" split>
        <div class="flex gap-3">
          <SSheet v-for="side in sides" :key="side" title="Sheet Title" :side="side">
            <template #trigger>
              <SButton variant="outline">{{ side }}</SButton>
            </template>
            <div>Sheet Content</div>
            <template #footer>
              <SButton>Confirm</SButton>
            </template>
          </SSheet>
        </div>
      </SCard>
      <SCard title="Content Scrollable">
        <SSheet title="Sheet Title">
          <template #trigger>
            <SButton variant="outline">Scrollable</SButton>
          </template>
          <SScrollArea>
            <div v-for="i in 100" :key="i">Sheet Content</div>
          </SScrollArea>
          <template #footer>
            <SButton>Confirm</SButton>
          </template>
        </SSheet>
      </SCard>
    </div>
  </SCard>
</template>
