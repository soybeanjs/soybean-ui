<script setup lang="ts">
import { SButton, SCard, SPopover } from 'soy-ui';
import type { PopoverAlign, PopoverSide } from 'soy-ui';

defineOptions({
  name: 'DemoPopover'
});

const sides: PopoverSide[] = ['top', 'right', 'bottom', 'left'];

const aligns: PopoverAlign[] = ['start', 'center', 'end'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Popover Position" split>
      <div v-for="side in sides" :key="side">
        <div class="py-12px text-18px">Side: {{ side }}</div>
        <div class="flex flex-wrap gap-12px">
          <SPopover v-for="align in aligns" :key="align" :side="side" :align="align">
            <template #trigger>
              <SButton variant="plain">align: {{ align }}</SButton>
            </template>
            <p>Popover content</p>
          </SPopover>
        </div>
      </div>
    </SCard>
    <SCard title="Popover Arrow" split>
      <SPopover show-arrow>
        <template #trigger>
          <SButton variant="plain">with arrow</SButton>
        </template>
        <p>Popover content</p>
      </SPopover>
    </SCard>
  </div>
</template>
