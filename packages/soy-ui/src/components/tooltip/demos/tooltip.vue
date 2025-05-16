<script setup lang="ts">
import { SButton, SCard, STooltip } from 'soy-ui';
import type { TooltipAlign, TooltipSide } from 'soy-ui';

defineOptions({
  name: 'DemoTooltip'
});

const sides: TooltipSide[] = ['top', 'right', 'bottom', 'left'];

const aligns: TooltipAlign[] = ['start', 'center', 'end'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Tooltip Position" split>
      <div v-for="side in sides" :key="side">
        <div class="py-12px text-18px">Side: {{ side }}</div>
        <div class="flex flex-wrap gap-12px">
          <STooltip v-for="align in aligns" :key="align" :side="side" :align="align">
            <template #trigger>
              <SButton variant="plain">align: {{ align }}</SButton>
            </template>
            <p>Tooltip content</p>
          </STooltip>
        </div>
      </div>
    </SCard>
    <SCard title="Tooltip Arrow" split>
      <STooltip show-arrow>
        <template #trigger>
          <SButton variant="plain">with arrow</SButton>
        </template>
        <p>Tooltip content</p>
      </STooltip>
    </SCard>
  </div>
</template>
