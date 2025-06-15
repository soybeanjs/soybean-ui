<script setup lang="ts">
import { SButton, SCard, STooltip } from '@ui';
import type { Align, Side } from '@ui';

defineOptions({
  name: 'DemoTooltip'
});

const sides: Side[] = ['top', 'right', 'bottom', 'left'];

const aligns: Align[] = ['start', 'center', 'end'];
</script>

<template>
  <SCard title="Tooltip" :ui="{ content: 'flex-c gap-3' }">
    <SCard title="Tooltip Position" split>
      <div v-for="side in sides" :key="side">
        <div class="py-12px text-18px">Side: {{ side }}</div>
        <div class="flex flex-wrap gap-12px">
          <STooltip v-for="align in aligns" :key="align" :content-props="{ side: side, align: align }">
            <template #trigger>
              <SButton variant="pure">align: {{ align }}</SButton>
            </template>
            <p>Tooltip content</p>
          </STooltip>
        </div>
      </div>
    </SCard>
    <SCard title="Tooltip Arrow" split>
      <STooltip show-arrow>
        <template #trigger>
          <SButton variant="pure">with arrow</SButton>
        </template>
        <p>Tooltip content</p>
      </STooltip>
    </SCard>
  </SCard>
</template>
