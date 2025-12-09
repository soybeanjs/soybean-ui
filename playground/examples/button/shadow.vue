<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
import type { ButtonShadow } from '@soybeanjs/ui';

const shadows: ButtonShadow[] = ['none', 'sm', 'md', 'lg'];
</script>

<template>
  <div>
    <h3 class="playground-title">Shadow</h3>
    <div class="flex flex-wrap gap-3">
      <SButton v-for="item in shadows" :key="item" variant="pure" :shadow="item">
        {{ item }}
      </SButton>
    </div>
  </div>
</template>
