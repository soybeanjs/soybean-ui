<script setup lang="ts">
import { SCard, SRadio, SRadioGroup } from 'soy-ui';
import type { RadioGroupItemProps, ThemeColor, ThemeSize } from 'soy-ui';

defineOptions({
  name: 'DemoRadio'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

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
  <div class="flex-c gap-4">
    <SCard title="Color" split>
      <div class="flex-c gap-12px">
        <SRadioGroup v-for="color in colors" :key="color" :color="color" :items="items" />
      </div>
    </SCard>
    <SCard title="Size" split>
      <div class="flex-c gap-12px">
        <SRadioGroup v-for="size in sizes" :key="size" :size="size" :items="items" />
      </div>
    </SCard>
    <SCard title="Orientation: Vertical" split>
      <SRadioGroup orientation="vertical" :items="items" />
    </SCard>
    <SCard title="Disabled All" split>
      <SRadioGroup :items="items" disabled />
    </SCard>
    <SCard title="Disabled Item" split>
      <SRadioGroup>
        <SRadio v-for="item in items" :key="item.value" v-bind="item" :disabled="item.value === '2'" />
      </SRadioGroup>
    </SCard>
  </div>
</template>
