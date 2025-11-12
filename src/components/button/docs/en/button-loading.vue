<script setup lang="ts">
import { ref } from 'vue';
import { SButtonLoading } from '@soybeanjs/ui';

const loading = ref(false);

const handleClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3>加载状态</h3>
      <div class="flex gap-2 flex-wrap">
        <SButtonLoading :loading="true">Loading</SButtonLoading>
        <SButtonLoading :loading="loading" @click="handleClick">
          {{ loading ? '处理中...' : '点击我' }}
        </SButtonLoading>
      </div>
    </div>
  </div>
</template>
