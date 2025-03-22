<script setup lang="ts">
import { SBadge, SCard } from 'soy-ui';
import type { BadgeVariant, ThemeColor } from 'soy-ui';

defineOptions({
  name: 'DemoBadge'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const variants: BadgeVariant[] = ['solid', 'pure', 'outline'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Color" split>
      <div class="flex flex-wrap gap-12px">
        <SBadge v-for="color in colors" :key="color" :color="color">{{ color }}</SBadge>
      </div>
    </SCard>
    <SCard title="Variant" split>
      <div class="flex-c-stretch gap-12px">
        <div v-for="color in colors" :key="color" class="flex flex-wrap gap-12px">
          <SBadge v-for="variant in variants" :key="variant" :color="color" :variant="variant">{{ variant }}</SBadge>
        </div>
      </div>
    </SCard>
  </div>
</template>
