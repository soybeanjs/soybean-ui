<script setup lang="ts">
import { kebabCase, pascalCase } from '@soybeanjs/utils';
import BackgroundDecoration from '@/motion/background-decoration.vue';
import { menuData } from '../constants/menus';

const { t } = useI18n();

const totalComponents = computed(() => menuData.reduce((total, group) => total + group.items.length, 0));

const groupLabelMap = computed(() => new Map(menuData.map(group => [group.value, t(group.i18n)])));

const heroStats = computed(() => [
  {
    label: t('components.home.stats.components'),
    value: totalComponents.value
  },
  {
    label: t('components.home.stats.categories'),
    value: menuData.length
  },
  {
    label: t('components.home.stats.packages'),
    value: 2
  },
  {
    label: t('components.home.stats.guides'),
    value: 4
  }
]);

const features = computed(() => [
  {
    title: t('components.home.features.headless_first.title'),
    description: t('components.home.features.headless_first.desc'),
    icon: 'lucide:code-xml',
    iconClass: 'text-primary bg-primary/10'
  },
  {
    title: t('components.home.features.styled_wrappers.title'),
    description: t('components.home.features.styled_wrappers.desc'),
    icon: 'lucide:sparkles',
    iconClass: 'text-info bg-info/10'
  },
  {
    title: t('components.home.features.accessible.title'),
    description: t('components.home.features.accessible.desc'),
    icon: 'lucide:accessibility',
    iconClass: 'text-success bg-success/10'
  },
  {
    title: t('components.home.features.type_safe.title'),
    description: t('components.home.features.type_safe.desc'),
    icon: 'lucide:file-type-2',
    iconClass: 'text-warning bg-warning/10'
  },
  {
    title: t('components.home.features.slot_overrides.title'),
    description: t('components.home.features.slot_overrides.desc'),
    icon: 'lucide:panel-top',
    iconClass: 'text-primary bg-primary/10'
  },
  {
    title: t('components.home.features.theme_ready.title'),
    description: t('components.home.features.theme_ready.desc'),
    icon: 'lucide:swatch-book',
    iconClass: 'text-info bg-info/10'
  },
  {
    title: t('components.home.features.component_coverage.title'),
    description: t('components.home.features.component_coverage.desc'),
    icon: 'lucide:layout-grid',
    iconClass: 'text-success bg-success/10'
  },
  {
    title: t('components.home.features.ecosystem.title'),
    description: t('components.home.features.ecosystem.desc'),
    icon: 'lucide:rocket',
    iconClass: 'text-warning bg-warning/10'
  }
]);

const quickLinks = computed(() => [
  {
    title: t('components.home.quick_links.get_started.title'),
    description: t('components.home.quick_links.get_started.desc'),
    to: '/overview/quick-start',
    icon: 'lucide:rocket'
  },
  {
    title: t('components.home.quick_links.introduction.title'),
    description: t('components.home.quick_links.introduction.desc'),
    to: '/overview/introduction',
    icon: 'lucide:book-open-text'
  },
  {
    title: t('components.home.quick_links.components.title'),
    description: t('components.home.quick_links.components.desc'),
    to: '/components',
    icon: 'lucide:layout-grid'
  },
  {
    title: t('components.home.quick_links.theming.title'),
    description: t('components.home.quick_links.theming.desc'),
    to: '/overview/theming',
    icon: 'lucide:swatch-book'
  }
]);

const featuredComponents = computed(() => {
  const items = [
    {
      key: 'button',
      icon: 'lucide:mouse-pointer-click',
      iconClass: 'text-primary bg-primary/10',
      description: t('components.home.featured.button')
    },
    {
      key: 'input',
      icon: 'lucide:text-cursor-input',
      iconClass: 'text-info bg-info/10',
      description: t('components.home.featured.input')
    },
    {
      key: 'select',
      icon: 'lucide:list-filter',
      iconClass: 'text-success bg-success/10',
      description: t('components.home.featured.select')
    },
    {
      key: 'dialog',
      icon: 'lucide:app-window',
      iconClass: 'text-warning bg-warning/10',
      description: t('components.home.featured.dialog')
    },
    {
      key: 'table',
      icon: 'lucide:table-properties',
      iconClass: 'text-primary bg-primary/10',
      description: t('components.home.featured.table')
    },
    {
      key: 'form',
      icon: 'lucide:clipboard-list',
      iconClass: 'text-info bg-info/10',
      description: t('components.home.featured.form')
    }
  ] as const;

  return items.map(item => {
    const group = menuData.find(entry => entry.items.includes(item.key));

    return {
      ...item,
      label: pascalCase(item.key),
      to: `/components/${kebabCase(item.key)}`,
      groupLabel: group ? (groupLabelMap.value.get(group.value) ?? '') : ''
    };
  });
});

const featuredGroups = computed(() =>
  menuData.slice(0, 4).map(group => ({
    value: group.value,
    label: t(group.i18n),
    count: group.items.length,
    items: group.items.slice(0, 4).map(item => ({
      key: item,
      label: pascalCase(item),
      to: `/components/${kebabCase(item)}`
    }))
  }))
);
</script>

<template>
  <div class="docs-home-page relative min-h-screen overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
    <BackgroundDecoration />

    <div class="relative z-10 mx-auto flex max-w-screen-2xl flex-col gap-8">
      <section
        class="docs-hero-shell docs-home-card-shell docs-home-hero-shell glass-shell relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 xl:px-10"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.16),transparent_28%),radial-gradient(circle_at_bottom_left,hsl(var(--warning)/0.12),transparent_26%)]"
        />

        <div class="relative grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_22rem] xl:items-start">
          <div class="space-y-6">
            <div
              class="glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
            >
              <SIcon icon="lucide:sparkles" class="text-sm text-primary" />
              <span>{{ t('components.home.kicker') }}</span>
            </div>

            <div class="space-y-4">
              <div class="flex gap-4 flex-wrap">
                <div
                  class="docs-home-card-panel glass-panel flex size-20 shrink-0 items-center justify-center rounded-3xl p-1 lt-sm:size-18"
                >
                  <AppLogo class="size-full" />
                </div>
                <h1
                  class="max-w-4xl text-[clamp(3rem,7vw,5.5rem)] leading-[0.9] font-black tracking-[-0.065em] text-primary/90 lt-sm:pt-3"
                >
                  {{ t('components.home.title') }}
                </h1>
                <p class="max-w-2xl text-lg leading-8 text-muted-foreground pl-25 lt-sm:pl-0">
                  {{ t('components.home.description') }}
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-3">
              <SButtonLink
                to="/overview/quick-start"
                size="lg"
                variant="ghost"
                shape="rounded"
                class="docs-home-button docs-home-button-primary group min-w-40"
              >
                {{ t('components.home.actions.start') }}
                <SIcon icon="lucide:arrow-right" class="transition-transform duration-200 group-hover:translate-x-1" />
              </SButtonLink>
              <SButtonLink
                to="/components"
                size="lg"
                variant="ghost"
                shape="rounded"
                class="docs-home-button docs-home-button-subtle group min-w-40"
              >
                {{ t('components.home.actions.browse') }}
                <SIcon icon="lucide:layout-grid" class="transition-transform duration-200 group-hover:translate-x-1" />
              </SButtonLink>
              <SButtonLink
                href="https://github.com/soybeanjs/soybean-ui"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="ghost"
                shape="rounded"
                class="docs-home-button docs-home-button-subtle group min-w-40"
              >
                <SIcon icon="lucide:github" class="transition-transform duration-200 group-hover:-translate-y-0.5" />
                {{ t('components.home.actions.github') }}
              </SButtonLink>
            </div>
          </div>

          <SCard
            :title="t('components.home.stats_title')"
            split
            class="docs-home-card-shell glass-shell docs-home-soft-shell overflow-hidden"
          >
            <template #default>
              <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div
                  v-for="stat in heroStats"
                  :key="stat.label"
                  class="docs-home-card-panel glass-panel docs-home-stat-panel px-4 py-3"
                >
                  <div class="text-2xl font-bold tracking-[-0.04em] text-foreground">{{ stat.value }}</div>
                  <div class="mt-1 text-sm text-muted-foreground">{{ stat.label }}</div>
                </div>
              </div>
            </template>
          </SCard>
        </div>
      </section>

      <section class="docs-home-card-shell glass-shell grid gap-4 p-4 lg:grid-cols-2 xl:grid-cols-4">
        <SLink
          v-for="item in quickLinks"
          :key="item.to"
          :to="item.to"
          class="docs-home-card-panel glass-panel glass-hover-lift group px-5 py-4 hover:border-primary/35"
        >
          <div class="flex min-h-18 items-center gap-4">
            <div class="rounded-2xl bg-primary/10 p-3 text-xl text-primary">
              <SIcon :icon="item.icon" />
            </div>
            <div class="min-w-0 space-y-1.5">
              <h2
                class="text-base leading-6 font-semibold tracking-[-0.02em] text-foreground group-hover:text-primary sm:text-lg"
              >
                {{ item.title }}
              </h2>
              <p class="text-sm leading-6 text-muted-foreground">{{ item.description }}</p>
            </div>
          </div>
        </SLink>
      </section>

      <SCard
        :title="t('components.home.sections.highlights.title')"
        split
        class="docs-home-card-shell glass-shell overflow-hidden"
      >
        <template #default>
          <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="docs-home-card-panel glass-panel glass-hover-lift p-5 sm:p-6"
            >
              <div class="mb-4 inline-flex rounded-2xl p-3 text-xl" :class="feature.iconClass">
                <SIcon :icon="feature.icon" />
              </div>
              <h3 class="text-lg leading-7 font-semibold tracking-[-0.02em] text-foreground">{{ feature.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-muted-foreground">{{ feature.description }}</p>
            </div>
          </div>
        </template>
      </SCard>

      <SCard
        :title="t('components.home.sections.featured.title')"
        split
        class="docs-home-card-shell glass-shell overflow-hidden"
      >
        <template #description>{{ t('components.home.sections.featured.desc') }}</template>

        <template #extra>
          <SButtonLink
            to="/components"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="ghost"
            shape="rounded"
            class="docs-home-button docs-home-button-subtle"
          >
            {{ t('components.home.actions.browse') }}
          </SButtonLink>
        </template>

        <template #default>
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SLink
              v-for="item in featuredComponents"
              :key="item.key"
              :to="item.to"
              class="docs-home-card-panel glass-panel glass-hover-lift group p-5 hover:border-primary/35"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="rounded-2xl p-3 text-xl" :class="item.iconClass">
                  <SIcon :icon="item.icon" />
                </div>
                <span
                  v-if="item.groupLabel"
                  class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {{ item.groupLabel }}
                </span>
              </div>

              <div class="mt-4 space-y-2">
                <h3 class="text-lg leading-7 font-semibold tracking-[-0.02em] text-foreground group-hover:text-primary">
                  {{ item.label }}
                </h3>
                <p class="text-sm leading-6 text-muted-foreground">{{ item.description }}</p>
              </div>
            </SLink>
          </div>
        </template>
      </SCard>

      <SCard
        :title="t('components.home.sections.categories.title')"
        split
        class="docs-home-card-shell glass-shell overflow-hidden"
      >
        <template #extra>
          <SButtonLink
            to="/components"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="ghost"
            shape="rounded"
            class="docs-home-button docs-home-button-subtle"
          >
            {{ t('components.home.actions.browse') }}
          </SButtonLink>
        </template>

        <template #default>
          <div class="grid gap-4 lg:grid-cols-2">
            <div v-for="group in featuredGroups" :key="group.value" class="docs-home-card-panel glass-panel p-5">
              <div class="flex min-h-12 items-center justify-between gap-3">
                <h3 class="text-lg leading-7 font-semibold tracking-[-0.02em] text-foreground">{{ group.label }}</h3>
                <span class="text-sm font-medium text-muted-foreground">{{ group.count }}</span>
              </div>

              <div class="mt-4 flex flex-wrap gap-2">
                <SLink
                  v-for="item in group.items"
                  :key="item.key"
                  :to="item.to"
                  class="docs-home-name-pill rounded-full px-3 py-1.5 text-sm text-foreground transition-colors duration-200 hover:border-primary/35 hover:text-primary"
                >
                  {{ item.label }}
                </SLink>
              </div>
            </div>
          </div>
        </template>
      </SCard>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
