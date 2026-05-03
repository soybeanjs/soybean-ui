<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoToastAction from './action.vue';
import DemoToastAppearance from './appearance.vue';
import DemoToastBasic from './basic.vue';
import DemoToastControl from './control.vue';
import DemoToastPosition from './position.vue';
import DemoToastPromise from './promise.vue';
import DemoToastStack from './stack.vue';
import DemoToastTypes from './types.vue';
</script>

<template>
  <SCard title="Toast" split :ui="{ content: 'flex-c gap-4' }">
    <DemoToastBasic />
    <DemoToastTypes />
    <DemoToastPromise />
    <DemoToastAction />
    <DemoToastControl />
    <DemoToastAppearance />
    <DemoToastStack />
    <DemoToastPosition />
  </SCard>
</template>
