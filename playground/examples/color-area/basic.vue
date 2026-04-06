<script setup lang="ts">
import { ref } from 'vue';
import { SColorArea, SColorSwatch } from '@soybeanjs/ui';

const color = ref('#7c3aed');
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex flex-col gap-3">
      <SColorArea v-model="color" class="size-50" />
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <SColorSwatch :color="color" />
        <span>{{ color }}</span>
      </div>
    </div>
  </div>
</template>
