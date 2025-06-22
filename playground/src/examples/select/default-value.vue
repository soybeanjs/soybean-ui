<script setup lang="ts">
import { SCard, SSelect } from '@ui';
import type { SelectOptionData } from '@ui';

const fruits = ['apple', 'banana', 'cherry', 'orange', 'pear', 'plum', 'strawberry', 'watermelon'] as const;

type Fruit = (typeof fruits)[number];

const items: SelectOptionData<Fruit>[] = fruits.map(fruit => ({
  label: fruit,
  value: fruit
}));

const defaultFruit: string = 'strawberry';
</script>

<template>
  <SCard title="Default Value">
    <div class="w-60 lt-sm:w-auto">
      <SSelect :items="items" :default-value="defaultFruit" :value-props="{ placeholder: 'Please select a fruit' }" />
    </div>
  </SCard>
</template>
