<script setup lang="ts">
import { SCard, SSwitch } from '@ui';
import type { SwitchShape } from '@ui';

const shapes: SwitchShape[] = ['rounded', 'square'];
</script>

<template>
  <SCard title="Shape" :ui="{ content: 'flex gap-3' }">
    <SSwitch v-for="shape in shapes" :key="shape" size="xl" :default-value="true" :shape="shape" />
  </SCard>
</template>
