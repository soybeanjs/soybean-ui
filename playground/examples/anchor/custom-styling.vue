<script setup lang="ts">
import { SAnchor } from '@soybeanjs/ui';
import { anchorItems } from './shared';
</script>

<template>
  <div>
    <h3 class="playground-title">Custom Styling</h3>
    <SAnchor
      :items="anchorItems"
      :sticky="false"
      :ui="{
        root: 'rounded-xl border border-border bg-card p-3',
        item: 'gap-2',
        link: 'bg-transparent data-[state=active]:bg-primary/10 data-[state=active]:text-primary hover:bg-primary/5',
        indicator: 'bg-primary shadow-sm shadow-primary/50',
        children: 'border-primary/20'
      }"
    />
  </div>
</template>
