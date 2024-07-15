<script setup lang="ts">
import { ref } from 'vue';
import { SuButton } from '@soybean-unify/ui';
import { Airplay, Loader } from 'lucide-vue-next';

defineOptions({
  name: 'SuButtonDemo'
});

const loading = ref(false);
</script>

<template>
  <div class="py-12px text-18px">Color</div>
  <div class="flex flex-wrap gap-12px">
    <SuButton color="primary">Primary</SuButton>
    <SuButton color="destructive">Destructive</SuButton>
    <SuButton color="success">Success</SuButton>
    <SuButton color="warning">Warning</SuButton>
    <SuButton color="info">Info</SuButton>
    <SuButton color="secondary">Secondary</SuButton>
  </div>
  <div class="py-12px text-18px">Variant</div>
  <div class="flex-col-stretch gap-12px">
    <div class="flex flex-wrap gap-12px">
      <SuButton variant="solid">Solid</SuButton>
      <SuButton variant="pure">Pure</SuButton>
      <SuButton variant="outline">Outlined</SuButton>
      <SuButton variant="dashed">Dashed</SuButton>
      <SuButton variant="ghost">Ghost</SuButton>
      <SuButton variant="text">Text</SuButton>
      <SuButton variant="link">Link</SuButton>
    </div>
    <div class="flex flex-wrap gap-12px">
      <SuButton color="destructive" variant="solid">Solid</SuButton>
      <SuButton color="destructive" variant="pure">Pure</SuButton>
      <SuButton color="destructive" variant="outline">Outlined</SuButton>
      <SuButton color="destructive" variant="dashed">Dashed</SuButton>
      <SuButton color="destructive" variant="ghost">Ghost</SuButton>
      <SuButton color="destructive" variant="text">Text</SuButton>
      <SuButton color="destructive" variant="link">Link</SuButton>
    </div>
    <div class="flex flex-wrap gap-12px">
      <SuButton color="success" variant="solid">Solid</SuButton>
      <SuButton color="success" variant="pure">Pure</SuButton>
      <SuButton color="success" variant="outline">Outlined</SuButton>
      <SuButton color="success" variant="dashed">Dashed</SuButton>
      <SuButton color="success" variant="ghost">Ghost</SuButton>
      <SuButton color="success" variant="text">Text</SuButton>
      <SuButton color="success" variant="link">Link</SuButton>
    </div>
    <div class="flex flex-wrap gap-12px">
      <SuButton color="warning" variant="solid">Solid</SuButton>
      <SuButton color="warning" variant="pure">Pure</SuButton>
      <SuButton color="warning" variant="outline">Outlined</SuButton>
      <SuButton color="warning" variant="dashed">Dashed</SuButton>
      <SuButton color="warning" variant="ghost">Ghost</SuButton>
      <SuButton color="warning" variant="text">Text</SuButton>
      <SuButton color="warning" variant="link">Link</SuButton>
    </div>
    <div class="flex flex-wrap gap-12px">
      <SuButton color="info" variant="solid">Solid</SuButton>
      <SuButton color="info" variant="pure">Pure</SuButton>
      <SuButton color="info" variant="outline">Outlined</SuButton>
      <SuButton color="info" variant="dashed">Dashed</SuButton>
      <SuButton color="info" variant="ghost">Ghost</SuButton>
      <SuButton color="info" variant="text">Text</SuButton>
      <SuButton color="info" variant="link">Link</SuButton>
    </div>
    <div class="flex flex-wrap gap-12px">
      <SuButton color="secondary" variant="solid">Solid</SuButton>
      <SuButton color="secondary" variant="pure">Pure</SuButton>
      <SuButton color="secondary" variant="outline">Outlined</SuButton>
      <SuButton color="secondary" variant="dashed">Dashed</SuButton>
      <SuButton color="secondary" variant="ghost">Ghost</SuButton>
      <SuButton color="secondary" variant="text">Text</SuButton>
      <SuButton color="secondary" variant="link">Link</SuButton>
    </div>
  </div>
  <div class="py-12px text-18px">Size</div>
  <div class="flex flex-wrap gap-12px">
    <SuButton size="xs" class="w-48px">xs</SuButton>
    <SuButton color="destructive" variant="pure" size="sm">Small</SuButton>
    <SuButton color="success" variant="outline" size="md">Medium</SuButton>
    <SuButton color="warning" variant="ghost" size="lg">Large</SuButton>
  </div>
  <div class="py-12px text-18px">Shape</div>
  <div class="flex flex-wrap gap-12px">
    <SuButton color="primary" variant="outline" shape="rounded">Rounded</SuButton>
    <SuButton color="destructive" variant="outline" shape="square">
      <Airplay :size="16" />
    </SuButton>
    <SuButton color="success" variant="outline" shape="circle">
      <Airplay :size="16" />
    </SuButton>
    <SuButton color="info" variant="text" shape="square">
      <Airplay :size="16" />
    </SuButton>
  </div>
  <div class="py-12px text-18px">Slot</div>
  <div class="flex flex-wrap gap-12px">
    <SuButton color="primary">
      <template #before>
        <Airplay :size="16" />
      </template>
      Before
    </SuButton>
    <SuButton color="destructive" variant="outline">
      After
      <template #after>
        <Airplay :size="16" />
      </template>
    </SuButton>
    <SuButton color="success" variant="dashed">
      <template #before>
        <Airplay :size="16" />
      </template>
      Both
      <template #after>
        <Airplay :size="16" />
      </template>
    </SuButton>
  </div>
  <div class="py-12px text-18px">Disabled</div>
  <div class="flex flex-wrap gap-12px">
    <SuButton color="destructive" variant="solid" :disabled="true">Disabled</SuButton>
    <SuButton color="success" variant="outline" :disabled="true">Disabled</SuButton>
    <SuButton color="warning" variant="dashed" :disabled="true">Disabled</SuButton>
  </div>
  <div class="py-12px text-18px">Loading</div>
  <div class="flex flex-wrap gap-12px">
    <SuButton color="success" variant="solid" :loading="loading">
      <template #before>
        <Airplay :size="16" />
      </template>
      Loading
    </SuButton>
    <SuButton color="warning" variant="outline" :loading="loading">
      <template #loading>
        <Loader :size="16" />
      </template>
      Loading
    </SuButton>
    <SuButton color="info" variant="dashed" @click="loading = !loading">
      {{ loading ? 'End' : 'Start' }}
    </SuButton>
  </div>
</template>
