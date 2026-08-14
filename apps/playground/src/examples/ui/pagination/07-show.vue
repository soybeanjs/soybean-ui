<script setup lang="ts">
import { SPagination } from '@soybeanjs/ui';
</script>

<template>
  <p>When showFirstOrLast is false, the first and last buttons will not be shown</p>
  <SPagination
    show-edges
    :sibling-count="1"
    :items-per-page="10"
    :total="200"
    action-as-selected
    :show-first-or-last="false"
  />
</template>
