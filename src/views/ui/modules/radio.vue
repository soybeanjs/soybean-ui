<script setup lang="ts">
import { SRadio, SRadioGroup } from '@soybean-ui/vue';
import type { RadioGroupItemProps, ThemeColor, ThemeSize } from '@soybean-ui/vue';

defineOptions({
  name: 'UiRadio'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const items = createRadioGroupItems();

function createRadioGroupItems(): RadioGroupItemProps[] {
  return [
    { label: 'A', value: '1' },
    { label: 'B', value: '2' },
    { label: 'C', value: '3' }
  ];
}
</script>

<template>
  <div class="py-12px text-18px">Color</div>
  <div class="flex-c gap-12px">
    <SRadioGroup v-for="color in colors" :key="color" :color="color" :items="items" />
  </div>
  <div class="py-12px text-18px">Size</div>
  <div class="flex-c gap-12px">
    <SRadioGroup v-for="size in sizes" :key="size" :size="size" :items="items" />
  </div>
  <div class="py-12px text-18px">Orientation: Vertical</div>
  <SRadioGroup orientation="vertical" :items="items" />
  <div class="py-12px text-18px">Disabled All</div>
  <SRadioGroup :items="items" disabled />
  <div class="py-12px text-18px">Disabled Item</div>
  <SRadioGroup>
    <SRadio v-for="item in items" :key="item.value" v-bind="item" :disabled="item.value === '2'" />
  </SRadioGroup>
</template>

<style scoped></style>
