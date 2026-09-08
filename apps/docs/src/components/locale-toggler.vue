<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { MenuOptionData } from '@soybeanjs/ui';
import { snakeCase } from 'es-toolkit';

const { t, locale } = useI18n();
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();

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
  const path = switchLocalePath(item.value);

  if (path) {
    router.push(path);
  }
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
