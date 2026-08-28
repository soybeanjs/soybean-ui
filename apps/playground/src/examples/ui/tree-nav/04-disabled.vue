<script setup lang="ts">
import { ref } from 'vue';
import { SButton, STreeNav } from '@soybeanjs/ui';
import type { MenuOptionData } from '@soybeanjs/ui';

const disabled = ref(false);

const items: MenuOptionData<string>[] = [
  {
    value: 'products',
    label: 'Products',
    disabled: true,
    children: [{ value: 'ui', label: 'SoybeanUI' }]
  },
  {
    value: 'resources',
    label: 'Resources',
    children: [
      { value: 'templates', label: 'Templates', disabled: true },
      { value: 'icons', label: 'Icons' }
    ]
  },
  { value: 'support', label: 'Support' }
];

const toggleDisabled = () => {
  disabled.value = !disabled.value;
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="w-fit">
      <SButton size="sm" variant="outline" @click="toggleDisabled">Toggle bar disabled</SButton>
    </div>
    <STreeNav :items="items" :disabled="disabled" trigger="click" />
  </div>
</template>
