<script setup lang="ts">
defineOptions({
  name: 'ThemeEditorSection'
});

interface Props {
  /** the section title (already localized by the caller). */
  title: string;
  /** the one-line summary of what the section demonstrates. */
  description?: string;
  /** the theme tokens the section exercises, rendered as reference chips. */
  tokens?: string[];
}

withDefaults(defineProps<Props>(), {
  description: undefined,
  tokens: () => []
});
</script>

<template>
  <section class="overflow-hidden border border-border rounded-xl bg-card">
    <header class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border px-4 py-3">
      <div class="min-w-0">
        <h3 class="text-sm font-medium text-foreground">{{ title }}</h3>
        <p v-if="description" class="mt-0.5 text-xs text-muted-foreground">{{ description }}</p>
      </div>

      <ul v-if="tokens.length" class="flex flex-wrap gap-1">
        <li
          v-for="token in tokens"
          :key="token"
          class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-2xs text-muted-foreground"
        >
          {{ token }}
        </li>
      </ul>
    </header>

    <div class="space-y-4 p-4">
      <slot />
    </div>
  </section>
</template>
