<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { definePage } from 'ubean/runtime/vue';

definePage({
  layout: '404'
});

const { t } = useI18n();
</script>

<template>
  <div>
    {{ t('not_found_page') }}
  </div>
</template>
