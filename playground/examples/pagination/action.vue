<script setup lang="ts">
import { SPagination } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Action as selected</h3>
    <p>When actionAsSelected is true, the action button will be styled as selected</p>
    <SPagination show-edges :sibling-count="1" :items-per-page="10" :total="200" action-as-selected>
      <template #prev>Prev</template>
      <template #next>Next</template>
    </SPagination>
  </div>
</template>
