<script setup lang="ts">
import { useI18n } from 'vue-i18n';

definePage({ layout: 'blank' });

const { t } = useI18n();
</script>

<template>
  <div class="h-full w-full text-center">
    <h3 class="p-4 text-xl text-primary">{{ t('not_found_page') }}</h3>
    <SButtonLink class="mt-4">Back to Home</SButtonLink>
  </div>
</template>
