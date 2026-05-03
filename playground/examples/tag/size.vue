<script setup lang="ts">
import { STag } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <STag v-for="size in themeSizeOptions" :key="size.value" :size="size.value" variant="ghost">
      {{ size.label }}
    </STag>
  </div>
</template>
