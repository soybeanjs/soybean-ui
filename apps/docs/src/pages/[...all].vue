<script setup lang="ts">
import { useI18n } from 'vue-i18n';

definePage({ layout: '404' });

const { t } = useI18n();
</script>

<template>
  <div class="p-4 text-center">
    <h3>{{ t('not_found_page') }}</h3>
  </div>
</template>
