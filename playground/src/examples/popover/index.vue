<script setup lang="ts">
import { SButton, SCard, SPopover } from '@ui';
import type { Align, Side } from '@ui';

defineOptions({
  name: 'DemoPopover'
});

const sides: Side[] = ['top', 'right', 'bottom', 'left'];

const aligns: Align[] = ['start', 'center', 'end'];
</script>

<template>
  <SCard title="Popover" :ui="{ content: 'flex-c gap-3' }">
    <SCard title="Popover Position" split>
      <div v-for="side in sides" :key="side">
        <div class="py-12px text-18px">Side: {{ side }}</div>
        <div class="flex flex-wrap gap-12px">
          <SPopover v-for="align in aligns" :key="align" :content-props="{ side: side, align: align }">
            <template #trigger>
              <SButton variant="pure">align: {{ align }}</SButton>
            </template>
            <p>Popover content</p>
          </SPopover>
        </div>
      </div>
    </SCard>
    <SCard title="Popover Arrow" split>
      <SPopover show-arrow>
        <template #trigger>
          <SButton variant="pure">with arrow</SButton>
        </template>
        <p>Popover content</p>
      </SPopover>
    </SCard>
  </SCard>
</template>
