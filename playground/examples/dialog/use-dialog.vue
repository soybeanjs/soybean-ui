<script setup lang="ts">
import { Fragment, h } from 'vue';
import { SAlertDialogAction, SAlertDialogCancel, SButton, SCard, useDialog } from '@soybeanjs/ui';

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
  <SCard title="useDialog" split :ui="{ content: 'flex gap-3' }">
    <SButton color="warning" @click="openWarning">Open Warning Dialog</SButton>
    <SButton color="info" @click="openInfo">Open Info Dialog</SButton>
    <SButton color="success" @click="openSuccess">Open Success Dialog</SButton>
    <SButton color="destructive" @click="openDestructive">Open Destructive Dialog</SButton>
    <SButton @click="openCustomTextDialog">Custom Text Dialog</SButton>
    <SButton @click="openCustomFooterDialog">Custom Footer Dialog</SButton>
  </SCard>
</template>
