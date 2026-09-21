<script setup lang="ts">
import { SSkeleton } from '@vean/ui';
import type { SkeletonShape } from '@vean/ui';

const shapes: SkeletonShape[] = ['auto', 'rounded'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SSkeleton v-for="shape in shapes" :key="shape" class="w-32" :shape="shape" />
  </div>
</template>
