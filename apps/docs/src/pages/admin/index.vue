<script setup lang="ts">
import { resetDocOutline } from '~/composables/use-doc-outline';

// TODO(admin): scaffold placeholder — implement hero landing page.

const { t } = useI18n();

onBeforeUnmount(() => {
  resetDocOutline();
});
</script>

<template>
  <div class="mx-auto max-w-screen-2xl space-y-8 px-4 py-8 md:px-8 md:pt-12">
    <div class="space-y-4">
      <div
        class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
      >
        <SIcon icon="lucide:package" class="text-sm text-primary" />
        <span>{{ t('layout.header.admin') }}</span>
      </div>
      <h1 class="text-[clamp(2.4rem,5vw,4rem)] font-black leading-[0.96] tracking-[-0.05em] text-foreground">
        {{ t('admin.catalog.title') }}
      </h1>
      <p class="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
        {{ t('admin.catalog.description') }}
      </p>
    </div>
    <SCard :title="t('admin.catalog.placeholder.title')" split class="docs-card">
      <template #default>
        <p class="text-sm text-muted-foreground">
          {{ t('admin.catalog.placeholder.body') }}
        </p>
      </template>
    </SCard>
  </div>
</template>
