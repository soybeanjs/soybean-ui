<script setup lang="ts">
import { SKbd } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SKbd v-for="size in themeSizeOptions" :key="size.value" :size="size.value" value="command" />
  </div>
</template>
