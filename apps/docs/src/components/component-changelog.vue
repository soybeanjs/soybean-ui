<script setup lang="ts">
import { useGeneratedI18n } from '~/composables/use-generated-i18n';
import { getComponentChangelogDocument } from '~/shared/generated-changelog';
import type { GeneratedChangelogEntryType } from '~/shared/generated-changelog';

interface Props {
  component: string;
}

const props = defineProps<Props>();

const { t } = useI18n();
const { resolveGeneratedText } = useGeneratedI18n();

const changelogDocument = computed(() => getComponentChangelogDocument(props.component));
const versions = computed(() => changelogDocument.value.versions);

const typeKeyMap: Record<GeneratedChangelogEntryType, string> = {
  feature: 'changelog.types.feature',
  fix: 'changelog.types.fix',
  optimization: 'changelog.types.optimization',
  refactor: 'changelog.types.refactor',
  docs: 'changelog.types.docs',
  chore: 'changelog.types.chore',
  style: 'changelog.types.style'
};

const typeClassMap: Record<GeneratedChangelogEntryType, string> = {
  feature: 'border-primary/25 bg-primary/10 text-primary',
  fix: 'border-destructive/25 bg-destructive/10 text-destructive',
  optimization: 'border-info/25 bg-info/10 text-info',
  refactor: 'border-warning/25 bg-warning/10 text-warning',
  docs: 'border-success/25 bg-success/10 text-success',
  chore: 'border-muted/40 bg-muted/60 text-foreground/80',
  style: 'border-accent/25 bg-accent/10 text-accent'
};

function resolveTypeLabel(type: GeneratedChangelogEntryType) {
  return t(typeKeyMap[type]);
}

function resolveAuthors(authors: string[]) {
  return authors.join(', ');
}

function resolveSummary(summary: string, summaryKey: string | null) {
  return resolveGeneratedText(summary, summaryKey);
}
</script>

<template>
  <div class="space-y-6">
    <SAlert
      v-if="!versions.length"
      color="info"
      variant="soft"
      icon="lucide:history"
      :title="t('changelog.empty.title')"
      :description="t('changelog.empty.desc')"
    />

    <section v-for="version in versions" :key="version.version" class="space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div class="space-y-1">
          <h3 class="scroll-mt-24 text-2xl font-bold tracking-[-0.03em] text-foreground">
            {{ version.version }}
          </h3>
          <p class="text-sm text-muted-foreground">{{ version.date }}</p>
        </div>

        <SLink
          :href="version.compareUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
        >
          <span>{{ t('changelog.actions.compare_release') }}</span>
          <SIcon icon="lucide:arrow-up-right" class="text-sm" />
        </SLink>
      </div>

      <div class="space-y-3">
        <SCard
          v-for="entry in version.entries"
          :key="`${version.version}-${entry.commitHash ?? entry.summary}`"
          size="sm"
          split
          class="docs-card overflow-hidden"
        >
          <template #title>
            <div class="flex flex-wrap items-center gap-2.5">
              <span
                class="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
                :class="typeClassMap[entry.type]"
              >
                {{ resolveTypeLabel(entry.type) }}
              </span>

              <span
                v-if="entry.source === 'override'"
                class="inline-flex items-center rounded-full border border-border/60 bg-muted/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              >
                {{ t('changelog.sources.curated') }}
              </span>
            </div>
          </template>

          <template #default>
            <div class="space-y-3">
              <p class="text-sm leading-7 text-foreground sm:text-[15px]">
                {{ resolveSummary(entry.summary, entry.summaryKey) }}
              </p>

              <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span>{{ t('changelog.meta.scope') }}: {{ entry.scope }}</span>
                <span v-if="entry.authors.length">
                  {{ t('changelog.meta.authors') }}: {{ resolveAuthors(entry.authors) }}
                </span>
                <SLink
                  v-if="entry.commitUrl && entry.commitHash"
                  :href="entry.commitUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary/80"
                >
                  <span>{{ t('changelog.actions.view_commit') }}</span>
                  <code class="rounded bg-muted px-1.5 py-0.5 text-[11px] text-foreground">{{ entry.commitHash }}</code>
                </SLink>
              </div>
            </div>
          </template>
        </SCard>
      </div>
    </section>
  </div>
</template>
