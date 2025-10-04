<script setup lang="ts">
import { SCard } from '@ui';
import DemoPasswordBase from './base.vue';
import DemoPasswordDisabled from './disabled.vue';
import DemoPasswordClearable from './clearable.vue';
import DemoPasswordVisibleIcon from './icon.vue';
</script>

<template>
  <SCard title="Password" :ui="{ content: 'flex-c gap-3' }">
    <DemoPasswordBase />
    <DemoPasswordDisabled />
    <DemoPasswordClearable />
    <DemoPasswordVisibleIcon />
  </SCard>
</template>
