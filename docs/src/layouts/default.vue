<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: () => t('layout.default')
});
</script>

<template>
  <div class="h-full p-4">
    <SCard :title="t('layout.default')" class="h-full">
      <template #extra>
        <ToolBar />
      </template>
      <RouterView />
    </SCard>
  </div>
</template>
