<script setup lang="ts">
import { SBadge, SButton, SCard } from '@soybeanjs/ui';
import type { BadgePosition } from '@soybeanjs/ui';

const positions: BadgePosition[] = ['top-right', 'bottom-right', 'top-left', 'bottom-left'];
</script>

<template>
  <SCard title="Position" split :ui="{ content: 'flex gap-3' }">
    <SBadge v-for="position in positions" :key="position" :position="position">
      <SButton variant="pure">{{ position }}</SButton>
    </SBadge>
  </SCard>
</template>
