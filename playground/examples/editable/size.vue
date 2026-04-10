<script setup lang="ts">
import { SEditable } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex-c gap-3">
      <SEditable
        v-for="size in sizes"
        :key="size"
        :size="size"
        :default-value="`Editable ${size}`"
        :placeholder="`Editable ${size}`"
      />
    </div>
  </div>
</template>
