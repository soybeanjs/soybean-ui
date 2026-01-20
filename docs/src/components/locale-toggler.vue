<script setup lang="ts">
import { computed } from 'vue';
import type { MenuOptionData } from '@soybeanjs/ui';
import { availableLocales, loadLanguageAsync } from '@/modules/i18n';

const { t, locale } = useI18n();

const items = computed(() => {
  return availableLocales.map(item => {
    return {
      label: t(`locale.${item}`),
      value: item
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
  <SDropdownMenuRadio :model-value="locale" :items="items" @select="onSelectLocale">
    <template #trigger>
      <SButtonIcon icon="lucide:languages" size="lg" />
    </template>
  </SDropdownMenuRadio>
</template>
