<script setup lang="ts">
import { defineComponent, h } from 'vue';
import { SButton, SCard, SToastAction, useToast } from '@ui';

const toast = useToast();

const Content = defineComponent({
  setup() {
    return () =>
      h('div', [
        h(SToastAction, { altText: 'Action', asChild: true }, () =>
          h(SButton, { variant: 'pure', size: 'sm' }, () => 'action')
        )
      ]);
  }
});

const openWithContent = () => {
  toast({
    title: 'Toast Title',
    description: 'Toast Description',
    content: h(Content)
  });
};
</script>

<template>
  <SCard title="Custom Content" :ui="{ content: 'flex gap-3' }">
    <SButton variant="pure" @click="openWithContent">Default</SButton>
  </SCard>
</template>
