<script setup lang="ts">
import { SBadge, SButton } from '@soybeanjs/ui';
import type { BadgePosition } from '@soybeanjs/ui';

const positions: BadgePosition[] = ['top-right', 'bottom-right', 'top-left', 'bottom-left'];
</script>

<template>
  <div>
    <h3 class="playground-title">Position</h3>
    <div class="flex flex-wrap gap-3">
      <SBadge v-for="position in positions" :key="position" :position="position">
        <SButton variant="pure">{{ position }}</SButton>
      </SBadge>
    </div>
  </div>
</template>
