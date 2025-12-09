<script setup lang="ts">
import { Fragment, h } from 'vue';
import { SAlertDialogAction, SAlertDialogCancel, SButton, useDialog } from '@soybeanjs/ui';

const dialog = useDialog();

const openWarning = () => {
  dialog.warning({
    title: 'Dialog Title',
    description: 'Dialog Description',
    content: h('div', 'Dialog Content')
  });
};

const openSuccess = () => {
  dialog.success({
    title: 'Dialog Title',
    description: 'Dialog Description',
    content: h('div', 'Dialog Content')
  });
};

const openInfo = () => {
  dialog.info({ title: 'Dialog Title', description: 'Dialog Description', content: h('div', 'Dialog Content') });
};

const openDestructive = () => {
  dialog.destructive({ title: 'Dialog Title', description: 'Dialog Description', content: h('div', 'Dialog Content') });
};

const openCustomTextDialog = () => {
  dialog({
    type: 'warning',
    title: 'Dialog Title',
    description: 'Dialog Description',
    content: h('div', 'Dialog Content'),
    cancelText: 'Custom Cancel Text',
    confirmText: 'Custom Confirm Text'
  });
};

const openCustomFooterDialog = () => {
  dialog({
    type: 'warning',
    title: 'Dialog Title',
    description: 'Dialog Description',
    content: h('div', 'Dialog Content'),
    footer: h(Fragment, [h(SAlertDialogCancel, { text: 'Cancel' }), h(SAlertDialogAction, { text: 'Confirm' })])
  });
};
</script>

<template>
  <div>
    <h3 class="playground-title">useDialog</h3>
    <div class="flex flex-wrap gap-3">
      <SButton color="warning" @click="openWarning">Warning</SButton>
      <SButton color="info" @click="openInfo">Info</SButton>
      <SButton color="success" @click="openSuccess">Success</SButton>
      <SButton color="destructive" @click="openDestructive">Destructive</SButton>
      <SButton @click="openCustomTextDialog">Custom Text</SButton>
      <SButton @click="openCustomFooterDialog">Custom Footer</SButton>
    </div>
  </div>
</template>
