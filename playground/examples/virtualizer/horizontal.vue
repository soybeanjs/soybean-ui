<script setup lang="ts">
import { SCard, SVirtualizer, SVirtualizerItem } from '@ui';

const items = Array.from({ length: 1000 }, (_, index) => ({
  value: `item-${index}`,
  title: `item-${index}`
}));
</script>

<template>
  <SCard title="Horizontal" split>
    <div class="w-80 lt-sm:w-auto border rounded-md">
      <SVirtualizer :items="items" height="60px" :options="{ horizontal: true, estimateSize: () => 100 }">
        <template #item="{ virtualItem, item }">
          <SVirtualizerItem :data="virtualItem" class="px-2 py-1 border-r">
            {{ item.title }}
          </SVirtualizerItem>
        </template>
      </SVirtualizer>
    </div>
  </SCard>
</template>
