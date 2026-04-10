<script setup lang="ts">
import { SAvatar, SHoverCard, SLink } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex items-center gap-3">
      <SHoverCard>
        <template #trigger>
          <SLink href="https://github.com/soybeanjs" target="_blank" rel="noopener noreferrer">@soybeanjs</SLink>
        </template>
        <div class="flex gap-4">
          <SAvatar src="https://github.com/soybeanjs.png" fallback="SB" class="size-10 rounded-full" />
          <div class="space-y-1">
            <h4 class="text-sm font-semibold">SoybeanUI</h4>
            <p class="text-sm text-muted-foreground">A Vue 3 component library built on top of SoybeanHeadless.</p>
            <p class="text-xs text-muted-foreground">@soybeanjs • GitHub</p>
          </div>
        </div>
      </SHoverCard>
    </div>
  </div>
</template>
