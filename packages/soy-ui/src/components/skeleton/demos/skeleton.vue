<script setup lang="ts">
import { SCard, SSkeleton } from 'soy-ui';

defineOptions({
  name: 'DemoSkeleton'
});
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Skeleton" split>
      <div class="flex items-center space-x-4">
        <SSkeleton class="size-12 rounded-full" />
        <div class="space-y-2">
          <SSkeleton class="h-4 w-[250px]" />
          <SSkeleton class="h-4 w-[200px]" />
        </div>
      </div>
    </SCard>
    <SCard title="Card" split>
      <div class="flex flex-col space-y-3">
        <SSkeleton class="h-[125px] w-[250px] rounded-xl" />
        <div class="space-y-2">
          <SSkeleton class="h-4 w-[250px]" />
          <SSkeleton class="h-4 w-[200px]" />
        </div>
      </div>
    </SCard>
  </div>
</template>
