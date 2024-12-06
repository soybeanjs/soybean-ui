<script setup lang="ts">
import { SPagination } from '@soybean-ui/vue';
import type { ThemeSize } from '@soybean-ui/vue';

defineOptions({
  name: 'UiPagination'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
</script>

<template>
  <div class="py-12px text-18px">Variant</div>
  <div class="py-12px text-18px">plain</div>
  <SPagination show-edges :items-per-page="10" :total="200" />
  <div class="py-12px text-18px">ghost</div>
  <SPagination variant="ghost" show-edges :items-per-page="10" :total="200" />
  <div class="py-12px text-18px">Disabled</div>
  <SPagination disabled :items-per-page="10" :total="200" />
  <div class="py-12px text-18px">Size</div>
  <div class="flex-c-stretch gap-3">
    <div v-for="size in sizes" :key="size">
      <div>{{ size }}</div>
      <SPagination :size="size" show-edges :items-per-page="10" :total="200" />
    </div>
  </div>
</template>

<style scoped></style>
