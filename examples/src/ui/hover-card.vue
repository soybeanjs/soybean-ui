<script setup lang="ts">
import { SAvatar, SButton, SCard, SHoverCard } from 'soy-ui';

defineOptions({
  name: 'DemoHoverCard'
});
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Default" split>
      <SHoverCard :ui="{ content: 'w-64' }">
        <template #trigger>
          <SButton variant="link">@soybeanjs</SButton>
        </template>
        <div class="flex justify-between space-x-4">
          <SAvatar src="/favicon.svg">
            <template #fallback>VC</template>
          </SAvatar>
          <div class="space-y-1">
            <h4 class="text-sm font-semibold">@soybeanjs</h4>
            <p class="text-sm">SoybeanJS is a front-end technology team, built by Soybean.</p>
          </div>
        </div>
      </SHoverCard>
    </SCard>
    <SCard title="With Arrow" split>
      <SHoverCard :ui="{ content: 'w-64' }" show-arrow>
        <template #trigger>
          <SButton variant="link">@soybeanjs</SButton>
        </template>
        <div class="flex justify-between space-x-4">
          <SAvatar src="/favicon.svg">
            <template #fallback>VC</template>
          </SAvatar>
          <div class="space-y-1">
            <h4 class="text-sm font-semibold">@soybeanjs</h4>
            <p class="text-sm">SoybeanJS is a front-end technology team, built by Soybean.</p>
          </div>
        </div>
      </SHoverCard>
    </SCard>
  </div>
</template>
