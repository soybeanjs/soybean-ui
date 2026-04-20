<script setup lang="ts">
import { h } from 'vue';
import { dialog } from '@soybeanjs/ui';

const openWarning = () => {
  dialog.warning('Dialog Title', {
    description: 'Dialog Description',
    content: h('div', 'Dialog Content')
  });
};

const openSuccess = () => {
  dialog.success('Dialog Title', {
    description: 'Dialog Description',
    content: h('div', 'Dialog Content')
  });
};

const openInfo = () => {
  dialog.info('Dialog Title', { description: 'Dialog Description', content: h('div', 'Dialog Content') });
};

const openError = () => {
  dialog.error('Dialog Title', { description: 'Dialog Description', content: h('div', 'Dialog Content') });
};

const openCustomDialog = () => {
  dialog('Dialog Title', {
    icon: 'lucide:rocket',
    ui: {
      icon: 'text-purple-500',
      title: 'text-red-500'
    },
    description: 'Dialog Description',
    content: h('div', 'Dialog Content'),
    cancelText: 'Custom Cancel Text',
    confirmText: 'Custom Confirm Text'
  });
};
</script>

<template>
  <div>
    <h3 class="playground-title">Dialog API</h3>
    <div class="flex flex-wrap gap-3">
      <SButton color="warning" @click="openWarning">Warning</SButton>
      <SButton color="info" @click="openInfo">Info</SButton>
      <SButton color="success" @click="openSuccess">Success</SButton>
      <SButton color="destructive" @click="openError">Error</SButton>
      <SButton @click="openCustomDialog">Custom Text and Styled</SButton>
    </div>
  </div>
</template>
