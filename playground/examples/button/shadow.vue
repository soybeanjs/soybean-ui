<script setup lang="ts">
import { SButton, SCard } from '@ui';
import type { ButtonShadow } from '@ui';

const shadows: ButtonShadow[] = ['none', 'sm', 'md', 'lg'];
</script>

<template>
  <SCard title="Shadow" split>
    <div class="flex flex-wrap gap-3">
      <SButton v-for="item in shadows" :key="item" variant="pure" :shadow="item">
        {{ item }}
      </SButton>
    </div>
  </SCard>
</template>
