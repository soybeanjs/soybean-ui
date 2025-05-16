<script setup lang="ts">
import { SButton, SButtonGroup, SSelect } from 'soy-ui';
import type { SelectOptionData, ThemeSize } from 'soy-ui';

const size = defineModel<ThemeSize>('size', { default: 'md' });

const sizes: SelectOptionData<ThemeSize>[] = [
  { value: 'xs', label: 'xs' },
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
  { value: 'xl', label: 'xl' },
  { value: '2xl', label: '2xl' }
];
</script>

<template>
  <SButtonGroup>
    <SButton variant="pure" class="cursor-default">Size：</SButton>
    <SSelect v-model="size" :items="sizes" side="bottom" align="end" :side-offset="0" />
  </SButtonGroup>
</template>
