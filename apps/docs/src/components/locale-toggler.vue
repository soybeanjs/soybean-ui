<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { setLocale } from 'ubean/client';
import { snakeCase } from '@soybeanjs/headless/shared';
import type { MenuOptionData } from '@soybeanjs/ui';

const { t, locale } = useI18n();

const iconMap: Record<string, string> = {
  en: 'lucide:spell-check-2',
  zh: 'lucide:languages'
};
const locales = ['zh', 'en'];

const items = computed<MenuOptionData<string>[]>(() => {
  return locales.map(item => {
    return {
      label: t(`locale.${snakeCase(item)}`),
      value: item,
      icon: iconMap[item] || undefined
    };
  });
});

const onSelectLocale = (item: MenuOptionData<string>) => {
  setLocale(item.value);
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
