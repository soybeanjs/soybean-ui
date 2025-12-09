<script setup lang="ts">
import { SPagination } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex-c gap-3">
      <SPagination
        v-for="size in themeSizeOptions"
        :key="size.value"
        show-edges
        :sibling-count="1"
        :items-per-page="10"
        :total="200"
        :size="size.value"
      />
    </div>
  </div>
</template>
