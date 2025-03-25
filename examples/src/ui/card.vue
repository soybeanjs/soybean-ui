<script setup lang="ts">
import { SButtonIcon, SCard } from 'soy-ui';
import { X } from 'lucide-vue-next';

defineOptions({
  name: 'DemoCard'
});
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Card" split>
      <SCard title="Default" class="mb-12px">
        <template #extra>
          <span>extra</span>
        </template>
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
        <template #footer>Footer</template>
      </SCard>
      <SCard title="Split" split class="mb-12px">
        <template #extra>
          <SButtonIcon fit-content>
            <X />
          </SButtonIcon>
        </template>
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
        <template #footer>Footer</template>
      </SCard>
    </SCard>
    <SCard title="More" split>
      <SCard class="mb-12px">
        <p class="text-gray-500 dark:text-neutral-400">Only Content</p>
      </SCard>
      <SCard title="Title" split class="mb-12px">
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
      </SCard>
      <SCard split>
        <p class="text-gray-500 dark:text-neutral-400">Content</p>
        <template #footer>Footer</template>
      </SCard>
    </SCard>
  </div>
</template>
