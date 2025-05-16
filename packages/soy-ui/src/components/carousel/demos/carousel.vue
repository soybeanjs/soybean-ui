<script setup lang="ts">
import { SCard, SCarousel } from 'soy-ui';

defineOptions({
  name: 'DemoCarousel'
});
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Default" split>
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
    </SCard>
    <SCard title="Vertical" split>
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
    </SCard>
  </div>
</template>
