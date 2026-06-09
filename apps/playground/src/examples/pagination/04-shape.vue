<script setup lang="ts">
import { SPagination } from '@soybeanjs/ui';
</script>

<template>
  <div class="flex-c gap-3">
    <SPagination show-edges :sibling-count="1" :items-per-page="10" :total="200" shape="rounded" />
    <SPagination show-edges :sibling-count="1" :items-per-page="10" :total="200" shape="square" />
  </div>
</template>
