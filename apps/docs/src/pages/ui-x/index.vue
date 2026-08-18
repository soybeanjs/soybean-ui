<script setup lang="ts">
import { kebabCase, pascalCase } from '@soybeanjs/utils';
import { resetDocOutline, setDocOutline } from '~/composables/use-doc-outline';
import { uiXMenuData } from '../../constants/menus';

const { t } = useI18n();

const componentGroups = computed(() =>
  uiXMenuData.map(group => ({
    ...group,
    label: t(group.i18n),
    items: group.items.map(item => ({
      key: item,
      label: pascalCase(item),
      path: `/ui-x/components/${kebabCase(item)}`
    }))
  }))
);

watch(
  componentGroups,
  groups => {
    setDocOutline(
      groups.map(group => ({
        href: `#${group.value}-heading`,
        title: group.label
      }))
    );
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  resetDocOutline();
});
</script>

<template>
  <div class="mx-auto max-w-screen-2xl space-y-8 pb-10">
    <section
      class="relative overflow-hidden px-6 py-7 sm:px-8 sm:py-9 xl:px-10 border border-border/50 dark:border-border rounded-xl"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary-400)/0.12),transparent_30%),radial-gradient(circle_at_bottom_left,hsl(var(--primary-700)/0.07),transparent_28%)]"
      />
      <div class="relative space-y-5">
        <div
          class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
        >
          <SIcon icon="lucide:sparkles" class="text-sm text-primary" />
          <span>AI Components</span>
        </div>
        <div class="max-w-3xl space-y-3">
          <h1 class="text-[clamp(2.4rem,5vw,4rem)] font-black leading-[0.96] tracking-[-0.05em] text-foreground">
            {{ t('layout.header.ui_x') }}
          </h1>
          <p class="text-sm leading-7 text-muted-foreground sm:text-base">
            {{ t('ui_x.catalog.description') }}
          </p>
        </div>
        <SAlert
          color="info"
          variant="soft"
          icon="lucide:construction"
          :title="t('ui_x.catalog.notice.title')"
          :description="t('ui_x.catalog.notice.description')"
        />
        <div class="flex flex-wrap gap-3">
          <SButtonLink to="/ui-x/installation" size="lg" variant="solid" shape="rounded">
            {{ t('sidebar.ui_x_installation') }}
          </SButtonLink>
          <SButtonLink to="/ui-x/quick-start" size="lg" variant="pure" shape="rounded">
            {{ t('sidebar.ui_x_quick_start') }}
          </SButtonLink>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <div class="grid gap-5">
        <SCard
          v-for="group in componentGroups"
          :key="group.value"
          :aria-labelledby="`${group.value}-heading`"
          split
          class="docs-card overflow-hidden"
        >
          <template #title>
            <h3 :id="`${group.value}-heading`" class="text-xl font-semibold tracking-[-0.02em] text-foreground">
              {{ group.label }}
            </h3>
          </template>
          <template #extra>
            <span>{{ group.items.length }}</span>
          </template>
          <template #default>
            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <SButtonLink
                v-for="component in group.items"
                :key="component.key"
                :to="component.path"
                variant="ghost"
                shape="rounded"
                class="group docs-subtle-card justify-between"
              >
                <span class="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                  {{ component.label }}
                </span>
                <SIcon
                  icon="lucide:arrow-up-right"
                  class="shrink-0 text-sm text-muted-foreground transition-colors group-hover:text-primary"
                />
              </SButtonLink>
            </div>
          </template>
        </SCard>
      </div>
    </section>
  </div>
</template>
