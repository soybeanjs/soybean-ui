<script setup lang="ts">
import { kebabCase, pascalCase } from '@soybeanjs/utils';
import { menuData } from '@/constants/menus';
import { getComponentChangelogMeta } from '@/shared/generated-changelog';

const router = useRouter();
const route = useRoute('/components/[name]');
const { t } = useI18n();

const name = computed(() => route.params.name);

const path = computed(() => `components/${name.value}`);

const componentName = computed(() => pascalCase(name.value));
const importName = computed(() => `S${componentName.value}`);
const changelogMeta = computed(() => getComponentChangelogMeta(name.value));
const hasChangelog = computed(() => changelogMeta.value.entryCount > 0);
const changelogSectionId = computed(() => toHeadingId(t('component_detail.sections.changelog')));

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

  if (hasChangelog.value) {
    labels.push(t('component_detail.sections.changelog'));
  }

  return labels.map(label => ({
    label,
    href: `#${toHeadingId(label)}`,
    target: '_self' as const
  }));
});

interface ActionLink {
  label: string;
  href?: string;
  to?: string;
  target?: '_self' | '_blank';
}

const actionLinks = computed(() => {
  const links: ActionLink[] = [
    {
      label: t('component_detail.actions.demos'),
      href: `#${toHeadingId(t('component_detail.sections.demos'))}`,
      target: '_self'
    },
    {
      label: t('component_detail.actions.api'),
      href: `#${toHeadingId(t('component_detail.sections.api'))}`,
      target: '_self'
    }
  ];

  if (hasChangelog.value) {
    links.push({
      label: t('component_detail.actions.changelog'),
      href: `#${changelogSectionId.value}`,
      target: '_self'
    });
  }

  links.push({
    label: t('component_detail.actions.catalog'),
    to: '/components',
    target: '_self'
  });

  return links;
});

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
    <section
      class="relative overflow-hidden px-6 py-7 border border-border/50 dark:border-border rounded-xl sm:px-8 sm:py-9 xl:px-10"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary-400)/0.12),transparent_30%),radial-gradient(circle_at_bottom_left,hsl(var(--primary-700)/0.07),transparent_28%)]"
      />

      <div class="relative grid gap-8 xl:grid-cols-[minmax(0,1.12fr)_22rem] xl:items-start">
        <div class="space-y-5">
          <div
            class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
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
              <div class="docs-subtle-card px-4 py-3">
                <div class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {{ t('component_detail.meta.category') }}
                </div>
                <div class="mt-2 text-sm font-medium text-foreground">{{ currentGroupLabel }}</div>
              </div>
              <div class="docs-subtle-card px-4 py-3">
                <div class="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {{ t('component_detail.meta.import') }}
                </div>
                <div class="mt-2 text-sm font-medium text-foreground">{{ importName }}</div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 lt-md:grid-cols-1">
            <SButtonLink
              v-for="action in actionLinks"
              :key="action.label"
              :href="action.href"
              :to="action.to"
              :target="action.target"
              size="lg"
              color="accent"
              :variant="action.href ? 'ghost' : 'pure'"
              shape="rounded"
              class="group justify-between"
            >
              {{ action.label }}
              <SIcon
                :icon="action.href ? 'lucide:arrow-right' : 'lucide:layout-grid'"
                class="transition-transform duration-200 group-hover:translate-x-1"
              />
            </SButtonLink>
          </div>
        </div>

        <SCard :title="t('component_detail.quick_jump.title')" split class="docs-card overflow-hidden">
          <template #default>
            <div class="space-y-5">
              <div class="grid gap-2.5">
                <SButtonLink
                  v-for="link in sectionLinks"
                  :key="link.label"
                  :href="link.href"
                  :target="link.target"
                  variant="ghost"
                  color="accent"
                  class="justify-between"
                >
                  <span>{{ link.label }}</span>
                  <SIcon icon="lucide:arrow-right" class="text-sm text-muted-foreground" />
                </SButtonLink>
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
                  <SButtonLink
                    v-for="component in relatedComponents"
                    :key="component.key"
                    :to="component.to"
                    shape="rounded"
                    variant="pure"
                  >
                    {{ component.label }}
                  </SButtonLink>
                </div>
              </div>
            </div>
          </template>
        </SCard>
      </div>
    </section>

    <DocMd :path="path" @loaded="onLoaded" />

    <section v-if="hasChangelog" :id="changelogSectionId" class="relative min-w-0 overflow-hidden">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-x-0 top-0 h-36 bg-linear-to-r from-primary/8 via-warning/6 to-info/8 opacity-80"
      />
      <div class="relative min-w-0 px-5 py-6 sm:px-8 sm:py-8 xl:px-10 xl:py-10">
        <div class="min-w-0 space-y-6">
          <div class="space-y-2">
            <h2 class="scroll-mt-24 text-3xl font-black tracking-[-0.04em] text-foreground">
              {{ t('component_detail.sections.changelog') }}
            </h2>
            <p class="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {{ t('component_detail.changelog.desc') }}
            </p>
          </div>

          <ComponentChangelog :component="name" />
        </div>
      </div>
    </section>
  </div>
</template>
