<script setup lang="ts">
import ThemeConfigurator from '../../../playground/components/theme-configurator.vue';
import LocaleToggler from './locale-toggler.vue';
import ThemeSchemaToggler from './theme-schema-toggler.vue';

const { t } = useI18n();

const toolbarActions = [
  {
    key: 'language',
    labelKey: 'layout.header.language',
    component: LocaleToggler
  },
  {
    key: 'theme-configurator',
    labelKey: 'layout.header.theme_configurator',
    component: ThemeConfigurator
  },
  {
    key: 'theme',
    labelKey: 'layout.header.theme',
    component: ThemeSchemaToggler
  }
] as const;
</script>

<template>
  <div class="flex gap-4 lt-md:flex-col">
    <div class="flex-y-center lt-md:justify-between">
      <span class="md:hidden text-sm text-gray-500">{{ t('layout.header.github') }}</span>
      <SLink href="https://github.com/soybeanjs/soybean-ui">
        <SButtonIcon icon="mdi:github" size="lg" />
      </SLink>
    </div>
    <div v-for="action in toolbarActions" :key="action.key" class="flex-y-center lt-md:justify-between">
      <span class="md:hidden text-sm text-gray-500">{{ t(action.labelKey) }}</span>
      <component :is="action.component" />
    </div>
  </div>
</template>
