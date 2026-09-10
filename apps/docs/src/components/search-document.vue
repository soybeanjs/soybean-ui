<script setup lang="ts">
import { computed, nextTick, onMounted, shallowRef, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMagicKeys } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { localizePath } from 'ubean/client';
import { useContentSearch } from '@ubean/content/vue';
import type { CommandSingleOptionData, SelectEvent } from '@soybeanjs/ui';
import { loadContentSearchSections } from '~/shared/api-search';
import { resolveContentRoutePath } from '~/shared/content-route';

defineOptions({
  name: 'SearchDocument'
});

/** 搜索结果项：SCommand 的 items 元素；`crumbs` 由 `#item-label` 插槽消费（类型经 generic 推断）。 */
interface SearchOption extends CommandSingleOptionData {
  /** 章节面包屑标题链（hit.titles）。 */
  crumbs?: string[];
}

const router = useRouter();
const { t, locale } = useI18n();
const keys = useMagicKeys();

const searchTerm = shallowRef('');

// Full-text search over the SSG `__search.json` payload plus generated component
// API data (@ubean/content 0.4.7). Lazy init: sections load on first client
// interaction, never during SSR. minisearch enables prefix/fuzzy matching;
// `processTerm` lowercases so searching "button" finds "Button" and prop names.
const { status, error, results, search, init } = useContentSearch({
  immediate: false,
  sections: loadContentSearchSections,
  searchOptions: {
    miniSearch: {
      processTerm: (term: string) => term.toLowerCase()
    }
  }
});

const searchOpen = shallowRef(false);
const wrapperRef = shallowRef<HTMLElement | null>(null);

const CmdK = computed(() => keys['Cmd+K']?.value);

/** The payload holds separate en / zh collections (see ubean.config `content.sources`). */
function isCurrentLocaleHit(id: string): boolean {
  return locale.value === 'zh' ? id.startsWith('/zh/') : !id.startsWith('/zh/');
}

/**
 * Map a search hit id (`/zh?/ui/components/accordion#usage`) to a route with the
 * proper locale prefix. The section anchor is intentionally dropped: ubean's
 * content anchor ids (scule kebabCase) differ from the ids doc-md assigns at
 * render time (`toHeadingId`), so hash navigation cannot be trusted.
 */
function toRoute(id: string): string {
  const localePrefix = locale.value === 'en' ? '' : `/${locale.value}`;
  const stripPrefix = id.startsWith(localePrefix) ? id.slice(localePrefix.length) : id;
  const slug = stripPrefix.split('#')[0].replace(/^\/+/u, '');

  return localizePath(resolveContentRoutePath(slug));
}

// 同一页面的多个 section 命中合并为一条（保留最高分 hit），避免重复 value 冲突。
const commandItems = computed<SearchOption[]>(() => {
  const seen = new Map<string, SearchOption>();

  for (const hit of results.value) {
    if (!isCurrentLocaleHit(hit.id)) continue;
    const route = toRoute(hit.id);

    if (!seen.has(route)) {
      seen.set(route, {
        label: hit.title,
        value: route,
        description: hit.content.slice(0, 96),
        crumbs: hit.titles
      });
    }
  }

  return [...seen.values()];
});

function handleOpenChange() {
  searchOpen.value = !searchOpen.value;
}

function handleSelect(event: SelectEvent<string>) {
  const route = event.detail.value;
  if (!route) return;

  router.push(route);
  searchOpen.value = false;
  searchTerm.value = '';
}

watch(searchTerm, term => {
  // 引擎 init 后 search 是同步的；首次输入会等待一次 sections fetch。
  void search(term);
});

watch(searchOpen, open => {
  if (open) {
    void nextTick(() => wrapperRef.value?.querySelector('input')?.focus());
  }
});

watch(CmdK, v => {
  if (v) {
    handleOpenChange();
  }
});

// Preload sections while the panel stays closed so the first search is instant.
onMounted(() => {
  void init();
});
</script>

<template>
  <SDialog v-model:open="searchOpen" pure :show-close="false">
    <template #trigger>
      <SButton color="accent" variant="soft">
        <SIcon icon="lucide:search" class="text-base" />
        <SKbd :value="['command', 'k']" class="ms-auto" />
      </SButton>
    </template>

    <div ref="wrapperRef" class="border rounded-lg shadow-md">
      <SCommand
        v-model:search-term="searchTerm"
        external-filter
        :items="commandItems"
        :input-props="{ placeholder: t('layout.header.search') }"
        @select="handleSelect"
      >
        <template #empty>
          <span v-if="status === 'error'">Search failed: {{ error?.message }}</span>
          <span v-else-if="status === 'loading'">Searching…</span>
          <span v-else>{{ t('layout.header.search_empty') }}</span>
        </template>
        <template #item-label="{ item }">
          <span class="truncate">
            <span v-for="crumb in item.crumbs" :key="crumb" class="text-muted-foreground">{{ crumb }} ›</span>
            {{ item.label }}
          </span>
        </template>
        <template #bottom>
          <div class="flex-y-center gap-2 h-10 px-4 border-t border-solid">
            <SKbd value="enter" />
            <span>Go to Page</span>
          </div>
        </template>
      </SCommand>
    </div>
  </SDialog>
</template>
