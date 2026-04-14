<script setup lang="ts">
import { shallowRef } from 'vue';
import { SAnchor } from '@soybeanjs/ui';
import { createAnchorItems, createAnchorSections } from './shared';

const containerRef = shallowRef<HTMLElement>();

const getContainer = () => containerRef.value ?? window;
const items = createAnchorItems('sticky-');
const sections = createAnchorSections('sticky-');
</script>

<template>
  <div>
    <h3 class="playground-title">Sticky</h3>
    <div ref="containerRef" class="max-h-120 overflow-auto rounded-lg border border-border bg-background p-4">
      <div class="grid items-start gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        <SAnchor :items="items" :get-container="getContainer" :offset-top="16" />
        <div class="space-y-6">
          <section
            v-for="section in sections"
            :id="section.id"
            :key="section.id"
            class="min-h-56 rounded-lg border border-border/80 bg-card p-4"
          >
            <h4 class="text-base font-medium">{{ section.title }}</h4>
            <p class="mt-2 text-sm text-muted-foreground">The anchor stays pinned inside the scrolling container.</p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
