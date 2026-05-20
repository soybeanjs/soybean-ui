<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { SDropdownMenuRadio, SButtonIcon, SIcon } from '@soybeanjs/ui';
import type { MenuOptionData } from '@soybeanjs/ui';
import { snakeCase } from 'es-toolkit';
import { loadLanguageAsync } from '../../docs/src/modules/i18n';
import { useTheme } from '../theme';

const { locale, setLocale } = useTheme('LocaleToggler');

const { t } = useI18n();

const iconMap: Record<string, string> = {
  en: 'lucide:spell-check-2',
  'zh-CN': 'lucide:languages'
};
const locales = ['en', 'zh-CN'];

const items = computed<MenuOptionData<string>[]>(() => {
  return locales.map(item => {
    return {
      label: t(`locale.${snakeCase(item)}`),
      value: item,
      icon: iconMap[item] || undefined
    };
  });
});

const onSelectLocale = async (item: MenuOptionData<string>) => {
  setLocale(item.value);
  localStorage.setItem('locale', item.value);
  loadLanguageAsync(item.value);
};
</script>

<template>
  <SDropdownMenuRadio
    :modal="false"
    :model-value="locale"
    :items="items"
    indicator-position="end"
    @select="onSelectLocale"
  >
    <template #trigger>
      <SButtonIcon icon="lucide:languages" size="lg" />
    </template>
    <template #item-indicator-icon>
      <SIcon icon="lucide:check" />
    </template>
  </SDropdownMenuRadio>
</template>
