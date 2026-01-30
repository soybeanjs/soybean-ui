<script setup lang="ts">
import type { MenuOptionData } from '@soybeanjs/ui';
import { snakeCase } from 'es-toolkit';
import { availableLocales, loadLanguageAsync } from '@/modules/i18n';

const { t, locale } = useI18n();

const iconMap: Record<string, string> = {
  en: 'twemoji:flag-united-states',
  'zh-CN': 'twemoji:flag-china'
};
const locales = [...availableLocales].sort((a, b) => {
  if (a === 'zh-CN') return -1;
  if (b === 'zh-CN') return 1;
  return a.localeCompare(b);
});

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
  await loadLanguageAsync(item.value);
  locale.value = item.value;

  localStorage.setItem('locale', item.value);
};
</script>

<template>
  <SDropdownMenuRadio :model-value="locale" :items="items" indicator-position="end" @select="onSelectLocale">
    <template #trigger>
      <SButtonIcon icon="lucide:languages" size="lg" />
    </template>
    <template #item-indicator-icon>
      <SIcon icon="lucide:check" />
    </template>
  </SDropdownMenuRadio>
</template>
