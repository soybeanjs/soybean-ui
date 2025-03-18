<script setup lang="ts">
import { SButton, SPopover } from 'soy-ui';
import type { PopoverAlign, PopoverSide } from 'soy-ui';

defineOptions({
  name: 'UiPopover'
});

const sides: PopoverSide[] = ['top', 'right', 'bottom', 'left'];

const aligns: PopoverAlign[] = ['start', 'center', 'end'];
</script>

<template>
  <div class="py-12px text-18px">Popover Position</div>
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
  <div class="py-12px text-18px">Popover Arrow</div>
  <SPopover show-arrow>
    <template #trigger>
      <SButton variant="plain">with arrow</SButton>
    </template>
    <p>Popover content</p>
  </SPopover>
</template>
