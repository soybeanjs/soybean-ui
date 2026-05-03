<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoPasswordBasic from './basic.vue';
import DemoPasswordDisabled from './disabled.vue';
import DemoPasswordClearable from './clearable.vue';
import DemoPasswordVisibleIcon from './icon.vue';
</script>

<template>
  <SCard title="Password" split :ui="{ content: 'flex-c gap-4' }">
    <DemoPasswordBasic />
    <DemoPasswordDisabled />
    <DemoPasswordClearable />
    <DemoPasswordVisibleIcon />
  </SCard>
</template>
