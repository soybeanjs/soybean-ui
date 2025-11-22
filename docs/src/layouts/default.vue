<script setup lang="ts">
import AppHeader from '@/components/app-header.vue';
const { t } = useI18n();

useHead({
  title: () => t('layout.default')
});
</script>

<template>
  <div class="h-full pt-16 p-4 text-sm">
    <AppHeader />
    <SCard :title="t('layout.default')" class="h-full">
      <RouterView />
    </SCard>
  </div>
</template>
