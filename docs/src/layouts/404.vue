<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();

const route = useRoute();

const { t } = useI18n();
</script>

<template>
  <div class="h-full p-4 text-sm">
    <h3 class="text-center">The page {{ route.path }} is {{ t('not-found') }}</h3>
    <SButtonLink @click="router.back">{{ t('button.back') }}</SButtonLink>
  </div>
</template>
