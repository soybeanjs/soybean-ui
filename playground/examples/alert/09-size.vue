<script setup lang="ts">
import { SAlert } from '@soybeanjs/ui';
import { themeColorOptions, themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div class="flex flex-wrap gap-3">
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
  </div>
</template>
