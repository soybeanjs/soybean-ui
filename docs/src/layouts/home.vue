<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: () => t('layout.home')
});
</script>

<template>
  <div class="h-full p-4">
    <SCard :title="t('layout.home')" class="h-full">
      <template #extra>
        <ToolBar />
      </template>
      <RouterView />
    </SCard>
  </div>
</template>
