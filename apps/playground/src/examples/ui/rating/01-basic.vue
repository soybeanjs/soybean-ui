<script setup lang="ts">
import { ref } from 'vue';
import { SRating } from '@soybeanjs/ui';

const value = ref(3);
</script>

<template>
  <div class="flex-c gap-3">
    <SRating v-model="value" />
    <span class="text-sm text-muted-foreground">{{ value }}</span>
  </div>
</template>
