<script setup lang="ts">
import { SAlert, SCard } from '@soybeanjs/ui';
import { themeColorOptions, themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <SCard title="Size" split :ui="{ content: 'flex-c gap-3' }">
    <SAlert
      v-for="(size, index) in themeSizeOptions"
      :key="size.value"
      :color="themeColorOptions[index].value"
      :size="size.value"
      variant="soft"
      :title="size.label"
      icon="lucide:terminal"
      closable
    />
  </SCard>
</template>
