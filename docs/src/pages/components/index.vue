<script setup lang="ts">
import { kebabCase, pascalCase } from '@soybeanjs/utils';
import { resetDocOutline, setDocOutline } from '@/composables/use-doc-outline';
import { menuData } from '../../constants/menus';

const { t } = useI18n();

const newlyComponents = ['pageTabs'];

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

const summaryStats = computed(() => [
  {
    label: t('components.catalog.stats.total'),
    value: totalComponents.value
  },
  {
    label: t('components.catalog.stats.categories'),
    value: componentGroups.value.length
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
  <div class="mx-auto max-w-screen-2xl space-y-7 pb-8">
    <section class="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-6 shadow-sm sm:p-8">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.16),transparent_36%),radial-gradient(circle_at_bottom_left,hsl(var(--primary)/0.14),transparent_32%)]"
      />
      <div class="relative space-y-5">
        <div
          class="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground uppercase tracking-[0.18em]"
        >
          <SIcon icon="lucide:layout-grid" class="text-sm" />
          <span>{{ t('layout.header.components') }}</span>
        </div>

        <div class="max-w-3xl space-y-2.5">
          <h1 class="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {{ t('components.catalog.title') }}
          </h1>
          <p class="text-sm leading-6 text-muted-foreground sm:text-base">
            {{ t('components.catalog.description') }}
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 xl:max-w-lg">
          <div
            v-for="stat in summaryStats"
            :key="stat.label"
            class="rounded-2xl border border-border bg-background/75 p-3.5 backdrop-blur"
          >
            <div class="text-2xl font-semibold text-foreground">{{ stat.value }}</div>
            <div class="mt-1 text-xs text-muted-foreground sm:text-sm">{{ stat.label }}</div>
          </div>
        </div>

        <p class="text-xs leading-5 text-muted-foreground sm:text-sm">
          {{ t('components.catalog.helper') }}
        </p>
      </div>
    </section>

    <section
      v-for="group in componentGroups"
      :key="group.value"
      :aria-labelledby="`${group.value}-heading`"
      class="space-y-2.5"
    >
      <div class="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-2.5">
        <div class="space-y-1">
          <h2 :id="`${group.value}-heading`" class="text-xl font-semibold text-foreground sm:text-[1.35rem]">
            {{ group.label }}
          </h2>
          <p class="text-xs text-muted-foreground sm:text-sm">
            {{ t('components.catalog.group_count', { count: group.items.length }) }}
          </p>
        </div>
      </div>

      <div class="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        <SLink
          v-for="component in group.items"
          :key="component.key"
          :to="component.path"
          class="group flex items-center justify-between gap-3 rounded-lg border border-border bg-card/70 px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-sm"
        >
          <div class="min-w-0 flex items-center gap-2.5">
            <h3 class="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
              {{ component.label }}
            </h3>
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
    </section>
  </div>
</template>
