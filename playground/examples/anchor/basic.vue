<script setup lang="ts">
import { shallowRef } from 'vue';
import { SAnchor } from '@soybeanjs/ui';
import { createAnchorItems, createAnchorSections } from './shared';

const containerRef = shallowRef<HTMLElement>();

const getContainer = () => containerRef.value ?? window;
const items = createAnchorItems('basic-');
const sections = createAnchorSections('basic-');
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="grid gap-4 md:grid-cols-[240px_minmax(0,1fr)]">
      <SAnchor :items="items" :get-container="getContainer" :offset-top="12" />
      <div ref="containerRef" class="max-h-96 overflow-auto rounded-lg border border-border bg-card p-4">
        <section v-for="section in sections" :id="section.id" :key="section.id" class="mb-6 last:mb-0 scroll-mt-4">
          <div class="min-h-48 rounded-lg border border-dashed border-border/80 bg-muted/40 p-4">
            <h4 class="text-base font-medium">{{ section.title }}</h4>
            <p class="mt-2 text-sm text-muted-foreground">
              Scroll the content area to watch the active anchor update automatically.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
