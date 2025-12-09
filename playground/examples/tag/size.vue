<script setup lang="ts">
import { STag } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex flex-wrap gap-3">
      <STag v-for="size in themeSizeOptions" :key="size.value" :size="size.value" variant="ghost">
        {{ size.label }}
      </STag>
    </div>
  </div>
</template>
