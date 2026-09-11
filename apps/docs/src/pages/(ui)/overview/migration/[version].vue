<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getUpgradeGuides } from '~/shared/generated-changelog';

definePage({ layout: 'default' });

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const version = computed(() => String((route.params as Record<string, string | string[]>).version ?? ''));

const guides = computed(() => getUpgradeGuides());

const guide = computed(() => guides.value.find(item => item.docPath.endsWith(`/${version.value}`)));

// Unknown version slug → 404, mirroring the component detail pages.
if (!guide.value) {
  router.replace('/404');
}
</script>

<template>
  <div class="mx-auto max-w-screen-2xl space-y-6 pb-8">
    <section
      v-if="guide"
      class="relative overflow-hidden px-6 py-7 border border-border/50 dark:border-border rounded-xl sm:px-8 sm:py-9 xl:px-10"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary-400)/0.12),transparent_30%),radial-gradient(circle_at_bottom_left,hsl(var(--primary-700)/0.07),transparent_28%)]"
      />

      <div class="relative space-y-4">
        <SButtonLink to="/releases" size="sm" variant="ghost" color="accent" class="group -ml-2">
          <SIcon icon="lucide:arrow-left" class="transition-transform duration-200 group-hover:-translate-x-1" />
          {{ t('releases_page.title') }}
        </SButtonLink>

        <div class="flex flex-wrap items-center gap-2.5">
          <span class="text-sm font-medium text-muted-foreground">
            {{ t('migration.kicker') }}
          </span>
          <div class="code-btn-outline">{{ guide.version }}</div>
        </div>

        <h1 class="text-3xl font-black tracking-[-0.05em] text-foreground">
          {{ t('migration.title', { version: guide.version }) }}
        </h1>
        <p class="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          {{ t('migration.helper') }}
        </p>
      </div>
    </section>

    <DocMd v-if="guide" :path="guide.docPath" />
  </div>
</template>
