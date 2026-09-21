<script setup lang="ts">
import { STag } from '@vean/ui';
import type { TagShape } from '@vean/ui';

const shapes: TagShape[] = ['auto', 'rounded'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <STag v-for="shape in shapes" :key="shape" :shape="shape">
      {{ shape }}
    </STag>
  </div>
</template>
