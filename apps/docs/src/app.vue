<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { SConfigProvider } from '@soybeanjs/ui';

const { locale } = useI18n();
</script>

<template>
  <SConfigProvider :locale="locale" persist-theme>
    <slot />
  </SConfigProvider>
</template>
