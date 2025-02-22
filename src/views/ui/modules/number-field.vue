<script setup lang="ts">
import { SNumberField } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

defineOptions({
  name: 'UiNumberField'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
</script>

<template>
  <div class="w-320px lt-sm:w-auto">
    <div class="py-12px text-18px">Size</div>
    <div class="flex-c gap-2">
      <div v-for="size in sizes" :key="size" class="flex-c">
        <div>{{ size }}</div>
        <SNumberField :size="size" />
      </div>
    </div>
    <div class="py-12px text-18px">Center</div>
    <div class="flex-c gap-2">
      <div v-for="size in sizes" :key="size" class="flex-c">
        <div>{{ size }}</div>
        <SNumberField :size="size" center />
      </div>
    </div>
    <div class="py-12px text-18px">Disabled</div>
    <SNumberField :default-value="10" disabled />
    <div class="py-12px text-18px">Custom Icon</div>
    <SNumberField :default-value="10">
      <template #decrement-icon>
        <ChevronDown />
      </template>
      <template #increment-icon>
        <ChevronUp />
      </template>
    </SNumberField>
  </div>
</template>
