<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoTextareaBasic from './basic.vue';
import DemoTextareaAutosize from './autosize.vue';
import DemoTextareaClearable from './clearable.vue';
import DemoTextareaDisabled from './disabled.vue';
import DemoTextareaCounter from './counter.vue';
import DemoTextareaFooter from './footer.vue';
</script>

<template>
  <SCard title="Textarea" split :ui="{ content: 'flex-c gap-4' }">
    <DemoTextareaBasic />
    <DemoTextareaAutosize />
    <DemoTextareaClearable />
    <DemoTextareaDisabled />
    <DemoTextareaCounter />
    <DemoTextareaFooter />
  </SCard>
</template>
