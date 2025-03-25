<script setup lang="ts">
import { SCard, SPagination } from 'soy-ui';

defineOptions({
  name: 'DemoPagination'
});
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Variant" split>
      <div class="py-12px text-18px">plain</div>
      <SPagination show-edges :sibling-count="1" :items-per-page="10" :total="200" />
    </SCard>
    <SCard title="ghost" split>
      <SPagination variant="ghost" show-edges :sibling-count="1" :items-per-page="10" :total="200" />
    </SCard>
    <SCard title="Disabled" split>
      <SPagination disabled :sibling-count="1" :items-per-page="10" :total="200" />
    </SCard>
  </div>
</template>
