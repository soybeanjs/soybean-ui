<script setup lang="ts">
import { SCard, SCarousel } from 'soy-ui';

defineOptions({
  name: 'UiCarousel'
});
</script>

<template>
  <div class="py-12px text-18px">Default</div>
  <div class="p-10">
    <SCarousel
      :counts="10"
      :opts="{
        loop: true
      }"
      :ui="{ item: 'h-100px md:basis-1/4 lg:basis-1/5' }"
    >
      <template #default="{ index }">
        <SCard class="size-full">
          <div class="size-full flex-center">
            {{ index }}
          </div>
        </SCard>
      </template>
    </SCarousel>
  </div>
  <div class="py-12px text-18px">Vertical</div>
  <div class="p-10">
    <SCarousel
      :counts="10"
      :opts="{
        loop: true
      }"
      orientation="vertical"
      :ui="{ content: 'h-200px', item: 'md:basis-1/2' }"
    >
      <template #default="{ index }">
        <SCard class="size-full">
          {{ index }}
        </SCard>
      </template>
    </SCarousel>
  </div>
</template>
