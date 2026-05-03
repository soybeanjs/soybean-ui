<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SButton v-for="size in themeSizeOptions" :key="size.value" color="success" variant="pure" :size="size.value">
      {{ size.label }}
    </SButton>
  </div>
</template>
