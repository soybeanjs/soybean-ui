<script setup lang="ts">
import { ref } from 'vue';
import { SRating } from '@soybeanjs/ui';

const value = ref(3);
</script>

<template>
  <div class="flex-c-col gap-3">
    <div class="flex-c gap-2 items-center">
      <span class="text-xs text-muted-foreground w-12">xs</span>
      <SRating v-model="value" size="xs" />
    </div>
    <div class="flex-c gap-2 items-center">
      <span class="text-xs text-muted-foreground w-12">sm</span>
      <SRating v-model="value" size="sm" />
    </div>
    <div class="flex-c gap-2 items-center">
      <span class="text-xs text-muted-foreground w-12">md</span>
      <SRating v-model="value" size="md" />
    </div>
    <div class="flex-c gap-2 items-center">
      <span class="text-xs text-muted-foreground w-12">lg</span>
      <SRating v-model="value" size="lg" />
    </div>
    <div class="flex-c gap-2 items-center">
      <span class="text-xs text-muted-foreground w-12">xl</span>
      <SRating v-model="value" size="xl" />
    </div>
    <div class="flex-c gap-2 items-center">
      <span class="text-xs text-muted-foreground w-12">2xl</span>
      <SRating v-model="value" size="2xl" />
    </div>
    <div class="flex-c gap-4 mt-2">
      <SRating v-model="value" color="primary" />
      <SRating v-model="value" color="destructive" />
      <SRating v-model="value" color="success" />
      <SRating v-model="value" color="warning" />
      <SRating v-model="value" color="info" />
    </div>
  </div>
</template>
