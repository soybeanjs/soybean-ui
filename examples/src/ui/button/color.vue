<script setup lang="ts">
import { SButton, SCard } from 'soy-ui';
import type { ThemeColor } from 'soy-ui';

defineOptions({
  name: 'DemoButtonColor'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <SCard title="Color" split>
    <div class="flex flex-wrap gap-12px">
      <SButton v-for="color in colors" :key="color" :color="color">{{ color }}</SButton>
    </div>
  </SCard>
</template>
