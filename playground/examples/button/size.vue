<script setup lang="ts">
import { SButton, SCard } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <SCard title="Size" split>
    <div class="flex flex-wrap gap-3">
      <SButton v-for="size in themeSizeOptions" :key="size.value" color="success" variant="pure" :size="size.value">
        {{ size.label }}
      </SButton>
    </div>
  </SCard>
</template>
