<script setup lang="ts">
import { SButton, SCard } from '@soybeanjs/ui';
import type { ButtonShadow } from '@soybeanjs/ui';

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
