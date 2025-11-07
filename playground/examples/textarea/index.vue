<script setup lang="ts">
import { SCard } from '@ui';
import DemoTextareaBase from './base.vue';
import DemoTextareaAutosize from './autosize.vue';
import DemoTextareaClearable from './clearable.vue';
import DemoTextareaDisabled from './disabled.vue';
import DemoTextareaCounter from './counter.vue';
import DemoTextareaFooter from './footer.vue';
</script>

<template>
  <SCard title="Textarea" :ui="{ content: 'flex-c gap-3' }">
    <DemoTextareaBase />
    <DemoTextareaAutosize />
    <DemoTextareaClearable />
    <DemoTextareaDisabled />
    <DemoTextareaCounter />
    <DemoTextareaFooter />
  </SCard>
</template>
