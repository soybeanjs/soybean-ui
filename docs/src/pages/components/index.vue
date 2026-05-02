<script setup lang="ts">
import { toKebabCase, toPascalCase } from '@soybeanjs/headless/shared';
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
      label: toPascalCase(item),
      path: `/components/${toKebabCase(item)}`,
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
  <div class="mx-auto max-w-7xl space-y-10 pb-10">
    <section class="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-8 shadow-sm sm:p-10">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.14),transparent_32%)]"
      />
      <div class="relative space-y-6">
        <div
          class="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]"
        >
          <SIcon icon="lucide:layout-grid" class="text-sm" />
          <span>{{ t('layout.header.components') }}</span>
        </div>

        <div class="max-w-3xl space-y-3">
          <h1 class="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {{ t('components.catalog.title') }}
          </h1>
          <p class="text-base leading-7 text-muted-foreground sm:text-lg">
            {{ t('components.catalog.description') }}
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 xl:max-w-xl">
          <div
            v-for="stat in summaryStats"
            :key="stat.label"
            class="rounded-2xl border border-border/70 bg-background/75 p-4 backdrop-blur"
          >
            <div class="text-3xl font-semibold text-foreground">{{ stat.value }}</div>
            <div class="mt-1 text-sm text-muted-foreground">{{ stat.label }}</div>
          </div>
        </div>

        <p class="text-sm text-muted-foreground">
          {{ t('components.catalog.helper') }}
        </p>
      </div>
    </section>

    <section
      v-for="group in componentGroups"
      :key="group.value"
      :aria-labelledby="`${group.value}-heading`"
      class="space-y-4"
    >
      <div class="flex flex-wrap items-end justify-between gap-3 border-b border-border/70 pb-3">
        <div class="space-y-1">
          <h2 :id="`${group.value}-heading`" class="text-2xl font-semibold text-foreground">
            {{ group.label }}
          </h2>
          <p class="text-sm text-muted-foreground">
            {{ t('components.catalog.group_count', { count: group.items.length }) }}
          </p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <SLink
          v-for="component in group.items"
          :key="component.key"
          :to="component.path"
          class="group block rounded-2xl border border-border/70 bg-card/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                {{ component.label }}
              </h3>
              <p class="mt-2 text-xs text-muted-foreground">{{ component.path }}</p>
            </div>
            <STag v-if="component.isNew" size="sm" variant="soft" color="success" shape="rounded">
              {{ t('components.catalog.badges.new') }}
            </STag>
          </div>

          <div
            class="mt-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-primary"
          >
            <span>{{ t('components.catalog.actions.open') }}</span>
            <SIcon icon="lucide:arrow-up-right" class="text-base" />
          </div>
        </SLink>
      </div>
    </section>
  </div>
</template>
