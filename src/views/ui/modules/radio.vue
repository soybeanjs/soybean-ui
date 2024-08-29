<script setup lang="ts">
import { SRadio, SRadioGroup } from 'soybean-ui';
import type { RadioColor, RadioGroupItemProps } from 'soybean-ui';

defineOptions({
  name: 'UiRadio'
});

const colors: RadioColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];

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
  <div class="py-12px text-18px">Default Radio Group</div>
  <SRadioGroup :items="items" />
  <div class="py-12px text-18px">Radio Group Color</div>
  <div class="flex-col gap-12px">
    <SRadioGroup v-for="color in colors" :key="color" :color="color" :items="items" />
  </div>
  <div class="py-12px text-18px">Radio Group Vertical</div>
  <SRadioGroup orientation="vertical" :items="items" />
  <div class="py-12px text-18px">Checkbox Group Disabled All</div>
  <SRadioGroup :items="items" disabled />
  <div class="py-12px text-18px">Checkbox Group Disabled Item</div>
  <SRadioGroup>
    <SRadio v-for="item in items" :key="item.value" v-bind="item" :disabled="item.value === '2'" />
  </SRadioGroup>
</template>

<style scoped></style>
