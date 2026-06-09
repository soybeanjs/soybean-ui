<script setup lang="ts">
import { SSelect } from '@soybeanjs/ui';
import type { SelectOptionData, Direction } from '@soybeanjs/ui';
import { useTheme } from '../theme';

const { direction, setDirection } = useTheme('DirectionToggler');

const directions: SelectOptionData<Direction>[] = [
  { label: 'LTR', value: 'ltr' },
  { label: 'RTL', value: 'rtl' }
];
</script>

<template>
  <SSelect :model-value="direction" :items="directions" @update:model-value="setDirection" />
</template>
