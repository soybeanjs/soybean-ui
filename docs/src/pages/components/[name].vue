<script setup lang="ts">
import { kebabCase, pascalCase } from '@soybeanjs/utils';
import { menuData } from '@/constants/menus';

const router = useRouter();
const route = useRoute('/components/[name]');
const { t } = useI18n();

const name = computed(() => route.params.name);

const path = computed(() => `components/${name.value}`);

const componentName = computed(() => pascalCase(name.value));
const importName = computed(() => `S${componentName.value}`);

const currentGroup = computed(() => {
  return menuData.find(group => group.items.some(item => kebabCase(item) === name.value));
});

const currentGroupLabel = computed(() => {
  return currentGroup.value ? t(currentGroup.value.i18n) : t('layout.header.components');
});

const sectionLinks = computed(() => {
  const labels = [
    t('component_detail.sections.overview'),
    t('component_detail.sections.usage'),
    t('component_detail.sections.demos'),
    t('component_detail.sections.api')
  ];

  return labels.map(label => ({
    label,
    href: `#${toHeadingId(label)}`,
    target: '_self' as const
  }));
});

const actionLinks = computed(() => [
  {
    label: t('component_detail.actions.demos'),
    href: `#${toHeadingId(t('component_detail.sections.demos'))}`,
    target: '_self' as const
  },
  {
    label: t('component_detail.actions.api'),
    href: `#${toHeadingId(t('component_detail.sections.api'))}`,
    target: '_self' as const
  },
  {
    label: t('component_detail.actions.catalog'),
    to: '/components'
  }
]);

const relatedComponents = computed(() => {
  return (
    currentGroup.value?.items
      .filter(item => kebabCase(item) !== name.value)
      .slice(0, 6)
      .map(item => ({
        key: item,
        label: pascalCase(item),
        to: `/components/${kebabCase(item)}`
      })) ?? []
  );
});

const summary = computed(() => {
  return t('component_detail.summary', {
    component: componentName.value,
    category: currentGroupLabel.value
  });
});

function toHeadingId(title: string) {
  const normalized = title
    .trim()
    .toLowerCase()
    .replace(/[`~!@#$%^&*()+=[\]{}|\\:;"'<>,.?/]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return `doc-${normalized || 'section'}`;
}

function onLoaded(isSuccess: boolean) {
  if (isSuccess) return;
  router.replace('/404');
}
</script>

<template>
  <div class="mx-auto max-w-screen-2xl space-y-6 pb-8">
    <section class="docs-hero-shell glass-shell relative overflow-hidden px-6 py-7 sm:px-8 sm:py-9 xl:px-10">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.16),transparent_30%),radial-gradient(circle_at_bottom_left,hsl(var(--warning)/0.12),transparent_28%)]"
      />

      <div class="relative grid gap-8 xl:grid-cols-[minmax(0,1.12fr)_22rem] xl:items-start">
        <div class="space-y-5">
          <div
            class="glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            <SIcon icon="lucide:component" class="text-sm text-primary" />
            <span>{{ t('component_detail.kicker') }}</span>
          </div>

          <div class="space-y-4">
            <div class="flex flex-wrap items-center gap-2.5">
              <span class="text-sm font-medium text-muted-foreground">{{ currentGroupLabel }}</span>
              <div class="code-btn-outline">@soybeanjs/ui</div>
              <div class="code-btn-outline">{{ importName }}</div>
            </div>

            <div class="space-y-3">
              <p class="text-3xl font-black tracking-[-0.05em] text-foreground">
                {{ componentName }}
              </p>
              <p class="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                {{ summary }}
              </p>
              <p class="max-w-3xl text-sm leading-7 text-muted-foreground">
                {{ t('component_detail.helper') }}
              </p>
            </div>

            <div class="grid gap-3 sm:grid-cols-2 xl:max-w-2xl">
              <div class="glass-panel px-4 py-3">
                <div class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {{ t('component_detail.meta.category') }}
                </div>
                <div class="mt-2 text-sm font-medium text-foreground">{{ currentGroupLabel }}</div>
              </div>
              <div class="glass-panel px-4 py-3">
                <div class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {{ t('component_detail.meta.import') }}
                </div>
                <div class="mt-2 text-sm font-medium text-foreground">{{ importName }}</div>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <SButtonLink
              v-for="action in actionLinks"
              :key="action.label"
              v-bind="action.to ? { to: action.to } : { href: action.href, target: action.target }"
              size="lg"
              variant="ghost"
              shape="rounded"
              :class="
                action.to
                  ? 'docs-home-button docs-home-button-subtle group min-w-36'
                  : 'docs-home-button docs-home-button-primary group min-w-36'
              "
            >
              {{ action.label }}
              <SIcon
                :icon="action.to ? 'lucide:layout-grid' : 'lucide:arrow-right'"
                class="transition-transform duration-200 group-hover:translate-x-1"
              />
            </SButtonLink>
          </div>
        </div>

        <SCard
          :title="t('component_detail.quick_jump.title')"
          split
          class="glass-shell docs-home-soft-shell docs-home-soft-shell docs-home-card-shell overflow-hidden"
        >
          <template #default>
            <div class="space-y-5">
              <div class="grid gap-2.5">
                <SLink
                  v-for="link in sectionLinks"
                  :key="link.label"
                  :href="link.href"
                  :target="link.target"
                  class="glass-panel glass-hover-lift group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium text-foreground hover:border-primary/35 hover:text-primary"
                >
                  <span>{{ link.label }}</span>
                  <SIcon
                    icon="lucide:arrow-right"
                    class="text-sm text-muted-foreground transition-colors group-hover:text-primary"
                  />
                </SLink>
              </div>

              <div class="space-y-3 border-t border-border/60 pt-4">
                <div>
                  <h2 class="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {{ t('component_detail.related.title') }}
                  </h2>
                  <p class="mt-1 text-sm leading-6 text-muted-foreground">
                    {{ t('component_detail.related.desc') }}
                  </p>
                </div>

                <div class="flex flex-wrap gap-2">
                  <SLink
                    v-for="component in relatedComponents"
                    :key="component.key"
                    :to="component.to"
                    class="docs-home-name-pill rounded-full px-3 py-1.5 text-sm text-foreground transition-colors duration-200 hover:border-primary/35 hover:text-primary"
                  >
                    {{ component.label }}
                  </SLink>
                </div>
              </div>
            </div>
          </template>
        </SCard>
      </div>
    </section>

    <DocMd :path="path" @loaded="onLoaded" />
  </div>
</template>
