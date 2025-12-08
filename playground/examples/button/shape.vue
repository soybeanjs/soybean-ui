<script setup lang="ts">
import { SButton, SButtonIcon, SCard } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Shape" split>
    <div class="flex flex-wrap gap-3">
      <SButton color="primary" variant="solid" shape="rounded">rounded</SButton>
      <div class="flex-c-center">
        <SButtonIcon icon="lucide:minus" color="destructive" variant="plain" shape="square" />
        <div class="text-12px text-#666">square</div>
      </div>
      <div class="flex-c-center">
        <SButtonIcon icon="lucide:plus" color="success" variant="outline" shape="circle" />
        <div class="text-12px text-#666">circle</div>
      </div>
      <div class="flex-c-center">
        <SButtonIcon icon="lucide:plus" color="warning" variant="dashed" shape="square" />
        <div class="text-12px text-#666">square</div>
      </div>
      <div class="flex-c-center">
        <SButtonIcon icon="lucide:minus" shape="circle" />
        <div class="text-12px text-#666">circle</div>
      </div>
    </div>
  </SCard>
</template>
