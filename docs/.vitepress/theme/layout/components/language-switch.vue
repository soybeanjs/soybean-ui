<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { computed } from 'vue';
import { SDropdownMenu } from 'soy-ui';
import { Icon } from '@iconify/vue';
defineOptions({
  name: 'LanguageSwitch'
});

const { site, lang } = useData();
const locales = computed(() => site.value.locales);
const { route, go } = useRouter();

// get all language items
const languageItems = computed(() => {
  return Object.entries(locales.value).map(([key, value]) => ({
    label: value.label,
    value: key
  }));
});

/** get current language label */
function getCurrentLangLabel() {
  for (const [_key, locale] of Object.entries(locales.value)) {
    if (locale.lang === lang.value) {
      return locale.label;
    }
  }
  // default return first language label
  return Object.values(locales.value)[0]?.label || 'English';
}

/** handle language switch */
function handleChange(value: string) {
  // get target language config
  const targetLocale = locales.value[value];
  if (!targetLocale) return;

  // if target language is current language, do not redirect
  if (targetLocale.lang === lang.value) return;

  // get current path
  let currentPath = route.path;

  // remove current language prefix (if exists)
  for (const locale of Object.values(locales.value)) {
    if (locale.link && locale.link !== '/' && currentPath.startsWith(locale.link)) {
      currentPath = currentPath.substring(locale.link.length) || '/';
      break;
    }
  }

  // if path is root path but not '/' , ensure it starts with '/'
  if (currentPath !== '/' && !currentPath.startsWith('/')) {
    currentPath = `/${currentPath}`;
  }

  // redirect to target language page
  const targetPath =
    targetLocale.link === '/' ? currentPath : `${targetLocale.link}${currentPath === '/' ? '' : currentPath}`;
  go(targetPath);
}
</script>

<template>
  <SDropdownMenu :items="languageItems" :ui="{ content: 'min-w-20' }" @change="handleChange">
    <template #trigger>
      <div
        class="mx-3 h-full inline-flex cursor-pointer items-center py-2 text-sm text-muted-foreground font-semibold hover:text-foreground"
      >
        <span class="whitespace-nowrap">{{ getCurrentLangLabel() }}</span>
        <Icon icon="akar-icons:chevron-down" class="ml-2 text-sm" />
      </div>
    </template>
    <template #item="item">
      <div
        class="flex-y-center cursor-pointer"
        :class="{ 'cursor-not-allowed': item.label === getCurrentLangLabel() }"
        @click="handleChange(item.value)"
      >
        <span>{{ item.label }}</span>
        <Icon v-if="item.label !== getCurrentLangLabel()" icon="lucide:arrow-up-right" class="ml-2 text-sm" />
      </div>
    </template>
  </SDropdownMenu>
</template>
