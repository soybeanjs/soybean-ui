<script setup lang="ts">
import { SButton, SButtonIcon, SCard } from 'soybean-ui';
import { Expand, Settings, X } from 'lucide-vue-next';

defineOptions({
  name: 'UiCard'
});
</script>

<template>
  <div class="w-400px lt-sm:w-full">
    <div class="py-12px text-18px">Default Card</div>
    <SCard title="Title">
      <template #extra>
        <span>extra</span>
      </template>
      <p class="text-gray-500 dark:text-neutral-400">Content</p>
      <template #footer>Footer</template>
    </SCard>
    <div class="py-12px text-18px">Split Card</div>
    <SCard title="Title" split="all">
      <template #extra>
        <SButtonIcon fit-content>
          <X />
        </SButtonIcon>
      </template>
      <p class="text-gray-500 dark:text-neutral-400">Content</p>
      <template #footer>Footer</template>
    </SCard>
    <div class="py-12px text-18px">Small size Card</div>
    <SCard title="Title" split="all" size="sm">
      <template #extra>
        <SButton variant="link" fit-content class="size-fit">more</SButton>
      </template>
      <p class="text-gray-500 dark:text-neutral-400">Content</p>
      <template #footer>Footer</template>
    </SCard>
    <div class="py-12px text-18px">Large size Card</div>
    <SCard title="Title" split="all" size="lg">
      <template #extra>
        <SButtonIcon fit-content>
          <Settings />
        </SButtonIcon>
      </template>
      <p class="text-gray-500 dark:text-neutral-400">Content</p>
    </SCard>
    <div class="py-12px text-18px">Extra Large size Card</div>
    <SCard title="Title" size="xl">
      <template #extra>
        <SButtonIcon fit-content>
          <Expand />
        </SButtonIcon>
      </template>
      <p class="text-gray-500 dark:text-neutral-400">Content</p>
    </SCard>
    <div class="py-12px text-18px">Only Content Card</div>
    <SCard>
      <p class="text-gray-500 dark:text-neutral-400">Content</p>
    </SCard>
  </div>
</template>

<style scoped></style>
