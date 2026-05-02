<script setup lang="ts">
import { kebabCase, pascalCase } from '@soybeanjs/utils';
import { resetDocOutline, setDocOutline } from '@/composables/use-doc-outline';
import { menuData } from '../../constants/menus';

const { t } = useI18n();

const newlyComponents = ['pageTabs'];
const featuredComponentKeys = ['button', 'input', 'select', 'dialog', 'table', 'form'];

const componentGroups = computed(() =>
  menuData.map(group => ({
    ...group,
    label: t(group.i18n),
    items: group.items.map(item => ({
      key: item,
      label: pascalCase(item),
      path: `/components/${kebabCase(item)}`,
      isNew: newlyComponents.includes(item)
    }))
  }))
);

const totalComponents = computed(() => componentGroups.value.reduce((total, group) => total + group.items.length, 0));
const newComponentsCount = computed(() => newlyComponents.length);

const featuredComponents = computed(() => {
  return featuredComponentKeys.map(item => {
    const group = componentGroups.value.find(entry => entry.items.some(component => component.key === item));
    const component = group?.items.find(entry => entry.key === item);

    return {
      key: item,
      label: component?.label ?? pascalCase(item),
      path: component?.path ?? `/components/${kebabCase(item)}`,
      groupLabel: group?.label ?? '',
      description: t(`components.catalog.featured.${item}`)
    };
  });
});

const quickActions = computed(() => [
  {
    title: t('components.catalog.quick_actions.quick_start.title'),
    description: t('components.catalog.quick_actions.quick_start.desc'),
    to: '/overview/quick-start',
    icon: 'lucide:rocket'
  },
  {
    title: t('components.catalog.quick_actions.introduction.title'),
    description: t('components.catalog.quick_actions.introduction.desc'),
    to: '/overview/introduction',
    icon: 'lucide:book-open-text'
  },
  {
    title: t('components.catalog.quick_actions.theming.title'),
    description: t('components.catalog.quick_actions.theming.desc'),
    to: '/overview/theming',
    icon: 'lucide:swatch-book'
  }
]);

const summaryStats = computed(() => [
  {
    label: t('components.catalog.stats.total'),
    value: totalComponents.value
  },
  {
    label: t('components.catalog.stats.categories'),
    value: componentGroups.value.length
  },
  {
    label: t('components.catalog.stats.featured'),
    value: featuredComponents.value.length
  },
  {
    label: t('components.catalog.stats.new'),
    value: newComponentsCount.value
  }
]);

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
  {
    immediate: true
  }
);

onBeforeUnmount(() => {
  resetDocOutline();
});
</script>

<template>
  <div class="mx-auto max-w-screen-2xl space-y-8 pb-10">
    <section
      class="relative overflow-hidden rounded-[2rem] border border-border/70 bg-background/82 px-6 py-7 shadow-[0_18px_52px_-34px_rgba(15,23,42,0.24)] backdrop-blur-md sm:px-8 sm:py-9 xl:px-10"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.16),transparent_30%),radial-gradient(circle_at_bottom_left,hsl(var(--warning)/0.12),transparent_28%)]"
      />
      <div class="relative grid gap-8 xl:grid-cols-[minmax(0,1.12fr)_22rem] xl:items-start">
        <div class="space-y-5">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            <SIcon icon="lucide:layout-grid" class="text-sm text-primary" />
            <span>{{ t('components.catalog.kicker') }}</span>
          </div>

          <div class="max-w-3xl space-y-3">
            <h1 class="text-[clamp(2.4rem,5vw,4rem)] font-black leading-[0.96] tracking-[-0.05em] text-foreground">
              {{ t('components.catalog.title') }}
            </h1>
            <p class="text-sm leading-7 text-muted-foreground sm:text-base">
              {{ t('components.catalog.description') }}
            </p>
          </div>

          <p class="max-w-3xl text-sm leading-7 text-muted-foreground">
            {{ t('components.catalog.helper') }}
          </p>

          <div class="flex flex-wrap gap-3">
            <SButtonLink to="/overview/quick-start" size="lg" variant="solid" shape="rounded">
              {{ t('components.catalog.actions.start') }}
            </SButtonLink>
            <SButtonLink to="/overview/introduction" size="lg" variant="soft" shape="rounded">
              {{ t('components.catalog.actions.learn') }}
            </SButtonLink>
          </div>
        </div>

        <SCard
          size="sm"
          split
          class="border-border/60 bg-background/72 shadow-[0_16px_44px_-32px_rgba(15,23,42,0.2)] backdrop-blur-sm"
        >
          <template #title>{{ t('components.catalog.stats_title') }}</template>
          <template #description>{{ t('components.catalog.stats_description') }}</template>

          <template #default>
            <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div
                v-for="stat in summaryStats"
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

    <section class="grid gap-4 xl:grid-cols-3">
      <SLink
        v-for="action in quickActions"
        :key="action.to"
        :to="action.to"
        class="group rounded-[1.5rem] border border-border/60 bg-background/78 p-5 shadow-[0_14px_38px_-30px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35"
      >
        <div class="flex items-start gap-4">
          <div class="rounded-2xl bg-primary/10 p-3 text-xl text-primary">
            <SIcon :icon="action.icon" />
          </div>
          <div class="space-y-2">
            <h2 class="text-lg font-semibold tracking-[-0.02em] text-foreground group-hover:text-primary">
              {{ action.title }}
            </h2>
            <p class="text-sm leading-6 text-muted-foreground">{{ action.description }}</p>
          </div>
        </div>
      </SLink>
    </section>

    <section>
      <SCard
        size="sm"
        split
        class="border-border/60 bg-background/78 shadow-[0_16px_44px_-32px_rgba(15,23,42,0.2)] backdrop-blur-sm"
      >
        <template #title>{{ t('components.catalog.sections.featured.title') }}</template>
        <template #description>{{ t('components.catalog.sections.featured.desc') }}</template>

        <template #default>
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SLink
              v-for="component in featuredComponents"
              :key="component.key"
              :to="component.path"
              class="group rounded-[1.35rem] border border-border/60 bg-background/84 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35"
            >
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-lg font-semibold tracking-[-0.02em] text-foreground group-hover:text-primary">
                  {{ component.label }}
                </h3>
                <SBadge size="xs" color="primary">{{ component.groupLabel }}</SBadge>
              </div>
              <p class="mt-2 text-sm leading-6 text-muted-foreground">{{ component.description }}</p>
            </SLink>
          </div>
        </template>
      </SCard>
    </section>

    <section class="space-y-4">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div class="space-y-1">
          <h2 class="text-2xl font-bold tracking-[-0.03em] text-foreground">
            {{ t('components.catalog.sections.groups.title') }}
          </h2>
          <p class="text-sm text-muted-foreground">{{ t('components.catalog.sections.groups.desc') }}</p>
        </div>
      </div>

      <div class="grid gap-5">
        <SCard
          v-for="group in componentGroups"
          :key="group.value"
          :aria-labelledby="`${group.value}-heading`"
          size="sm"
          split
          class="border-border/60 bg-background/78 shadow-[0_14px_38px_-30px_rgba(15,23,42,0.18)] backdrop-blur-sm"
        >
          <template #title>
            <h3 :id="`${group.value}-heading`" class="text-xl font-semibold tracking-[-0.02em] text-foreground">
              {{ group.label }}
            </h3>
          </template>
          <template #description>
            {{ t('components.catalog.group_count', { count: group.items.length }) }}
          </template>
          <template #extra>
            <SBadge size="xs" color="primary">{{ group.items.length }}</SBadge>
          </template>

          <template #default>
            <div class="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              <SLink
                v-for="component in group.items"
                :key="component.key"
                :to="component.path"
                class="group flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/84 px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35"
              >
                <div class="min-w-0 flex items-center gap-2.5">
                  <h4 class="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {{ component.label }}
                  </h4>
                  <STag v-if="component.isNew" size="sm" variant="soft" color="success" shape="rounded">
                    {{ t('components.catalog.badges.new') }}
                  </STag>
                </div>

                <SIcon
                  icon="lucide:arrow-up-right"
                  class="shrink-0 text-sm text-muted-foreground transition-colors group-hover:text-primary"
                />
              </SLink>
            </div>
          </template>
        </SCard>
      </div>
    </section>
  </div>
</template>
