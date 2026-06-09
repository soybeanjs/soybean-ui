<script setup lang="ts">
import { STag } from '@soybeanjs/ui';
import type { TagShape } from '@soybeanjs/ui';

const shapes: TagShape[] = ['auto', 'rounded'];
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <STag v-for="shape in shapes" :key="shape" :shape="shape">
      {{ shape }}
    </STag>
  </div>
</template>
