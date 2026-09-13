<script setup lang="ts">
import { SDateRangePicker } from '@vean/ui';
import { themeSizeOptions } from '~/constants/theme';
</script>

<template>
  <div class="flex flex-col gap-4">
    <SDateRangePicker v-for="item in themeSizeOptions" :key="item.value" :size="item.value" />
  </div>
</template>
