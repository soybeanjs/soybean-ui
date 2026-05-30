import { computed, watch } from 'vue';
import type { App, WatchStopHandle } from 'vue';
import { createI18n } from 'vue-i18n';
import type { Locale } from 'vue-i18n';
import { keysOf } from '@soybeanjs/utils';
import en from '../../docs/locales/en.json';
import zhCN from '../../docs/locales/zh-CN.json';

const messages: Record<Locale, typeof zhCN> = {
  'zh-CN': zhCN,
  en
};

export const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages
});

export const t = i18n.global.t;

export const setLocale = (lang?: (Locale | (string & {})) | null) => {
  const nextLocale = lang && Object.keys(messages).includes(lang) ? (lang as Locale) : 'zh-CN';

  i18n.global.locale.value = nextLocale;
  localStorage.setItem('locale', nextLocale);

  return nextLocale;
};

export const locale = computed({
  get() {
    return i18n.global.locale.value;
  },
  set(lang: Locale) {
    setLocale(lang);
  }
});

export const setupI18n = (app: App) => {
  app.use(i18n);

  setLocale(localStorage.getItem('locale'));
};

export const onLocaleChange = (handler: () => void, immediate = false): WatchStopHandle =>
  watch(
    locale,
    () => {
      handler();
    },
    { immediate }
  );

export const localeOptions: LocaleOption[] = keysOf(messages).map(key => ({
  code: key,
  i18nKey: `locale.${key}`
}));

export type LocaleOption = {
  code: Locale;
  i18nKey: `locale.${Locale}`;
};

export type { Locale };
