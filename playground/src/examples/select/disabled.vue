<script setup lang="ts">
import { SCard, SSelect } from '@ui';
import type { SelectOptionData } from '@ui';

const fruits = ['apple', 'banana', 'cherry', 'orange', 'pear', 'plum', 'strawberry', 'watermelon'];

const items: SelectOptionData<string>[] = fruits.map(fruit => ({
  label: fruit,
  value: fruit,
  disabled: fruit === 'cherry'
}));
</script>

<template>
  <SCard title="Disabled">
    <div class="w-60 lt-sm:w-auto">
      <SSelect :items="items" :value-props="{ placeholder: 'Please select a fruit' }" />
    </div>
  </SCard>
</template>
