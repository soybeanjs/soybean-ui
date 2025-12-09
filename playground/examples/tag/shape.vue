<script setup lang="ts">
import { STag } from '@soybeanjs/ui';
import type { TagShape } from '@soybeanjs/ui';

const shapes: TagShape[] = ['auto', 'rounded'];
</script>

<template>
  <div>
    <h3 class="playground-title">Shape</h3>
    <div class="flex flex-wrap gap-3">
      <STag v-for="shape in shapes" :key="shape" :shape="shape">
        {{ shape }}
      </STag>
    </div>
  </div>
</template>
