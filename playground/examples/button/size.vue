<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex flex-wrap gap-3">
      <SButton v-for="size in themeSizeOptions" :key="size.value" color="success" variant="pure" :size="size.value">
        {{ size.label }}
      </SButton>
    </div>
  </div>
</template>
