<script setup lang="ts">
import { SCard, SPagination } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';

defineOptions({
  name: 'DemoPagination'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Variant" split>
      <div class="py-12px text-18px">plain</div>
      <SPagination show-edges :sibling-count="1" :items-per-page="10" :total="200" />
    </SCard>
    <SCard title="ghost" split>
      <SPagination variant="ghost" show-edges :sibling-count="1" :items-per-page="10" :total="200" />
    </SCard>
    <SCard title="Disabled" split>
      <SPagination disabled :sibling-count="1" :items-per-page="10" :total="200" />
    </SCard>
    <SCard title="Size" split>
      <div class="flex-c-stretch gap-3">
        <div v-for="size in sizes" :key="size">
          <div>{{ size }}</div>
          <SPagination :size="size" show-edges :sibling-count="1" :items-per-page="10" :total="200" />
        </div>
      </div>
    </SCard>
  </div>
</template>
