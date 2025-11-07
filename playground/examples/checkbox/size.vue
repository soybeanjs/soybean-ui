<script setup lang="ts">
import { SCard, SCheckbox } from '@ui';
import { themeColorOptions, themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <SCard title="Size" :ui="{ content: 'flex gap-3' }">
    <SCheckbox
      v-for="(size, index) in themeSizeOptions"
      :key="size.value"
      :default-value="true"
      :size="size.value"
      :label="size.label"
      :color="themeColorOptions[index].value"
    />
  </SCard>
</template>
