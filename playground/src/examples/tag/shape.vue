<script setup lang="ts">
import { SCard, STag } from '@ui';
import type { TagShape } from '@ui';

const shapes: TagShape[] = ['auto', 'rounded'];
</script>

<template>
  <SCard title="Shape" split :ui="{ content: 'flex gap-3' }">
    <STag v-for="shape in shapes" :key="shape" :shape="shape">
      {{ shape }}
    </STag>
  </SCard>
</template>
