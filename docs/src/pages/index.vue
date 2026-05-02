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
    title: t('components.home.features.accessible.title'),
    description: t('components.home.features.accessible.desc'),
    icon: 'lucide:accessibility',
    iconClass: 'text-primary bg-primary/10'
  },
  {
    title: t('components.home.features.headless.title'),
    description: t('components.home.features.headless.desc'),
    icon: 'lucide:code-xml',
    iconClass: 'text-info bg-info/10'
  },
  {
    title: t('components.home.features.type_safe.title'),
    description: t('components.home.features.type_safe.desc'),
    icon: 'lucide:file-type-2',
    iconClass: 'text-success bg-success/10'
  },
  {
    title: t('components.home.features.customizable.title'),
    description: t('components.home.features.customizable.desc'),
    icon: 'lucide:palette',
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

const workflows = computed(() => [
  {
    step: '01',
    title: t('components.home.workflow.explore.title'),
    description: t('components.home.workflow.explore.desc')
  },
  {
    step: '02',
    title: t('components.home.workflow.compose.title'),
    description: t('components.home.workflow.compose.desc')
  },
  {
    step: '03',
    title: t('components.home.workflow.ship.title'),
    description: t('components.home.workflow.ship.desc')
  }
]);

const architecture = computed(() => [
  {
    title: t('components.home.architecture.headless.title'),
    description: t('components.home.architecture.headless.desc'),
    badge: t('components.home.architecture.headless.badge')
  },
  {
    title: t('components.home.architecture.ui.title'),
    description: t('components.home.architecture.ui.desc'),
    badge: t('components.home.architecture.ui.badge')
  },
  {
    title: t('components.home.architecture.docs.title'),
    description: t('components.home.architecture.docs.desc'),
    badge: t('components.home.architecture.docs.badge')
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
  <div class="relative min-h-screen overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
    <BackgroundDecoration />

    <div class="relative z-10 mx-auto flex max-w-screen-2xl flex-col gap-8">
      <section
        class="relative overflow-hidden rounded-[2rem] border border-border/70 bg-background/82 px-6 py-8 shadow-[0_18px_52px_-34px_rgba(15,23,42,0.24)] backdrop-blur-md sm:px-8 sm:py-10 xl:px-10"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.16),transparent_28%),radial-gradient(circle_at_bottom_left,hsl(var(--warning)/0.12),transparent_26%)]"
        />

        <div class="relative grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_22rem] xl:items-start">
          <div class="space-y-6">
            <div
              class="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
            >
              <SIcon icon="lucide:sparkles" class="text-sm text-primary" />
              <span>{{ t('components.home.kicker') }}</span>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-4 lt-sm:flex-col lt-sm:items-start">
                <AppLogo
                  class="size-20 shrink-0 rounded-3xl border border-border/60 bg-background/88 p-3 shadow-[0_12px_32px_-24px_rgba(15,23,42,0.2)]"
                />
                <div class="space-y-3">
                  <h1
                    class="max-w-4xl text-[clamp(2.8rem,7vw,5.8rem)] font-black leading-[0.92] tracking-[-0.06em] text-foreground"
                  >
                    {{ t('components.home.title') }}
                  </h1>
                  <p class="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                    {{ t('components.home.description') }}
                  </p>
                </div>
              </div>

              <p class="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
                {{ t('components.home.helper') }}
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <SButtonLink to="/overview/quick-start" size="lg" variant="solid" shape="rounded" class="group min-w-40">
                {{ t('components.home.actions.start') }}
                <SIcon icon="lucide:arrow-right" class="transition-transform duration-200 group-hover:translate-x-1" />
              </SButtonLink>
              <SButtonLink to="/components" size="lg" variant="soft" shape="rounded" class="group min-w-40">
                {{ t('components.home.actions.browse') }}
                <SIcon icon="lucide:layout-grid" class="transition-transform duration-200 group-hover:translate-x-1" />
              </SButtonLink>
              <SButtonLink
                href="https://github.com/soybeanjs/soybean-ui"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="pure"
                shape="rounded"
                class="group min-w-40"
              >
                <SIcon icon="lucide:github" class="transition-transform duration-200 group-hover:-translate-y-0.5" />
                {{ t('components.home.actions.github') }}
              </SButtonLink>
            </div>
          </div>

          <SCard
            :title="t('components.home.stats_title')"
            split
            class="border-border/60 bg-background/72 shadow-[0_16px_44px_-32px_rgba(15,23,42,0.2)] backdrop-blur-sm"
          >
            <template #default>
              <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div
                  v-for="stat in heroStats"
                  :key="stat.label"
                  class="rounded-2xl border border-border/60 bg-background/84 px-4 py-3"
                >
                  <div class="text-2xl font-bold tracking-[-0.04em] text-foreground">{{ stat.value }}</div>
                  <div class="mt-1 text-sm text-muted-foreground">{{ stat.label }}</div>
                </div>
              </div>
            </template>
          </SCard>
        </div>
      </section>

      <section class="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <SLink
          v-for="item in quickLinks"
          :key="item.to"
          :to="item.to"
          class="group rounded-[1.5rem] border border-border/60 bg-background/78 px-5 py-4 shadow-[0_14px_38px_-30px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-background"
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
        class="border-border/60 bg-background/78 shadow-[0_16px_44px_-32px_rgba(15,23,42,0.2)] backdrop-blur-sm"
      >
        <template #default>
          <div class="grid gap-4 sm:grid-cols-2">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="rounded-[1.35rem] border border-border/60 bg-background/84 p-5 sm:p-6"
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
        class="border-border/60 bg-background/78 shadow-[0_16px_44px_-32px_rgba(15,23,42,0.2)] backdrop-blur-sm"
      >
        <template #extra>
          <SButtonLink to="/components" variant="pure" size="sm">
            {{ t('components.home.actions.browse') }}
          </SButtonLink>
        </template>

        <template #default>
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SLink
              v-for="item in featuredComponents"
              :key="item.key"
              :to="item.to"
              class="group rounded-[1.35rem] border border-border/60 bg-background/84 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="rounded-2xl p-3 text-xl" :class="item.iconClass">
                  <SIcon :icon="item.icon" />
                </div>
                <SBadge size="xs" color="primary">{{ item.groupLabel }}</SBadge>
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

      <section class="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <SCard
          :title="t('components.home.sections.categories.title')"
          split
          class="border-border/60 bg-background/78 shadow-[0_16px_44px_-32px_rgba(15,23,42,0.2)] backdrop-blur-sm"
        >
          <template #extra>
            <SButtonLink to="/components" variant="pure" size="sm">
              {{ t('components.home.actions.browse') }}
            </SButtonLink>
          </template>

          <template #default>
            <div class="grid gap-4 lg:grid-cols-2">
              <div
                v-for="group in featuredGroups"
                :key="group.value"
                class="rounded-[1.35rem] border border-border/60 bg-background/84 p-5"
              >
                <div class="flex min-h-12 items-center justify-between gap-3">
                  <h3 class="text-lg leading-7 font-semibold tracking-[-0.02em] text-foreground">{{ group.label }}</h3>
                  <SBadge size="xs" color="primary">{{ group.count }}</SBadge>
                </div>

                <div class="mt-4 flex flex-wrap gap-2">
                  <SLink
                    v-for="item in group.items"
                    :key="item.key"
                    :to="item.to"
                    class="rounded-full border border-border/70 bg-background px-3 py-1.5 text-sm text-foreground transition-colors duration-200 hover:border-primary/35 hover:text-primary"
                  >
                    {{ item.label }}
                  </SLink>
                </div>
              </div>
            </div>
          </template>
        </SCard>

        <SCard
          :title="t('components.home.sections.architecture.title')"
          split
          class="border-border/60 bg-background/78 shadow-[0_16px_44px_-32px_rgba(15,23,42,0.2)] backdrop-blur-sm"
        >
          <template #default>
            <div class="space-y-4">
              <div
                v-for="item in architecture"
                :key="item.title"
                class="rounded-[1.25rem] border border-border/60 bg-background/84 p-4 sm:px-5"
              >
                <div class="flex items-center justify-between gap-3">
                  <h3 class="text-base leading-6 font-semibold text-foreground">{{ item.title }}</h3>
                  <SBadge size="xs" color="primary">{{ item.badge }}</SBadge>
                </div>
                <p class="mt-2 text-sm leading-6 text-muted-foreground">{{ item.description }}</p>
              </div>
            </div>
          </template>
        </SCard>
      </section>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
