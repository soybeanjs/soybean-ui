<script setup lang="ts">
import { SToggle } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <SToggle v-for="item in themeSizeOptions" :key="item.value" :size="item.value">{{ item.label }}</SToggle>
  </div>
</template>
