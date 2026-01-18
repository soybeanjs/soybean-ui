<script setup lang="ts">
import ThemeConfigurator from '../../../playground/components/theme-configurator.vue';

const { t } = useI18n();
</script>

<template>
  <div class="flex gap-4 lt-md:flex-col">
    <div class="flex-y-center lt-md:justify-between">
      <span class="md:hidden text-sm text-gray-500">{{ t('layout.header.github') }}</span>
      <SLink href="https://github.com/soybeanjs/soybean-ui">
        <SButtonIcon icon="mdi:github" size="lg" />
      </SLink>
    </div>
    <div class="flex-y-center lt-md:justify-between">
      <span class="md:hidden text-sm text-gray-500">{{ t('layout.header.language') }}</span>
      <LocaleToggler />
    </div>
    <div class="flex-y-center lt-md:justify-between">
      <span class="md:hidden text-sm text-gray-500">{{ t('layout.header.theme-customizer') }}</span>
      <ThemeConfigurator />
    </div>
    <div class="flex-y-center lt-md:justify-between">
      <span class="md:hidden text-sm text-gray-500">{{ t('layout.header.theme') }}</span>
      <ThemeSchemaToggler />
    </div>
  </div>
</template>
