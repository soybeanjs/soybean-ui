<script setup lang="ts">
import { SSkeleton } from 'soy-ui';

defineOptions({
  name: 'UiSkeleton'
});
</script>

<template>
  <div class="flex items-center space-x-4">
    <SSkeleton class="h-12 w-12 rounded-full" />
    <div class="space-y-2">
      <SSkeleton class="h-4 w-[250px]" />
      <SSkeleton class="h-4 w-[200px]" />
    </div>
  </div>
  <div class="py-12px text-18px">Card</div>
  <div class="flex flex-col space-y-3">
    <SSkeleton class="h-[125px] w-[250px] rounded-xl" />
    <div class="space-y-2">
      <SSkeleton class="h-4 w-[250px]" />
      <SSkeleton class="h-4 w-[200px]" />
    </div>
  </div>
</template>
