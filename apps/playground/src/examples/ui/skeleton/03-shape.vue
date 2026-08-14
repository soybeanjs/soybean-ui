<script setup lang="ts">
import { SSkeleton } from '@soybeanjs/ui';
import type { SkeletonShape } from '@soybeanjs/ui';

const shapes: SkeletonShape[] = ['auto', 'rounded'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SSkeleton v-for="shape in shapes" :key="shape" class="w-32" :shape="shape" />
  </div>
</template>
