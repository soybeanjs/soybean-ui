<script setup lang="ts">
import { SAvatar, SButton, SHoverCard } from '@soybean-ui/vue';

defineOptions({
  name: 'UiHoverCard'
});
</script>

<template>
  <div class="py-12px text-18px">Default</div>
  <SHoverCard content-class="w-64">
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
  <div class="py-12px text-18px">With Arrow</div>
  <SHoverCard content-class="w-64" show-arrow>
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
</template>
