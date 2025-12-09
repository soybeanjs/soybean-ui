<script setup lang="ts">
import { defineComponent, h } from 'vue';
import { SButton, SToastAction, useToast } from '@soybeanjs/ui';

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
  <div>
    <h3 class="playground-title">Custom Content</h3>
    <SButton variant="pure" @click="openWithContent">Default</SButton>
  </div>
</template>
