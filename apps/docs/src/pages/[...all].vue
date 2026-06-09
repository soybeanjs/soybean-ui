<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    {{ t('not_found_page') }}
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
