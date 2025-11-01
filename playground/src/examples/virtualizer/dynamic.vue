<script setup lang="ts">
import { SCard, SVirtualizer, SVirtualizerItem } from '@ui';

const items = Array.from({ length: 1000 }, (_, index) => ({
  value: `item-${index}`,
  title: `item-${index}`,
  size: Math.random() * 50 + 20
}));
</script>

<template>
  <SCard title="Dynamic" split>
    <div class="w-80 lt-sm:w-auto border rounded-md">
      <SVirtualizer :items="items" height="240px" dynamic>
        <template #item="{ virtualItem, item }">
          <SVirtualizerItem :data="virtualItem" class="px-2 py-1 border-b" :style="{ height: `${item.size}px` }">
            {{ item.title }}
          </SVirtualizerItem>
        </template>
      </SVirtualizer>
    </div>
  </SCard>
</template>
