<script setup lang="ts">
import { ref } from 'vue';
import { Button, ButtonLoading, Card } from '@ui';

defineOptions({
  name: 'DemoButtonLoading'
});

const loading = ref(false);

const startLoading = () => {
  loading.value = true;
};

const endLoading = () => {
  loading.value = false;
};
</script>

<template>
  <Card title="Loading" split>
    <div class="flex flex-wrap gap-3">
      <ButtonLoading variant="pure" auto-loading :loading-duration="1000">Loading in Start</ButtonLoading>
      <ButtonLoading
        variant="outline"
        loading-text="Loading..."
        auto-loading
        :loading-duration="1000"
        loading-position="center"
      >
        Loading in Center
      </ButtonLoading>
      <ButtonLoading variant="soft" auto-loading :loading-duration="1000" loading-position="end">
        Loading in End
      </ButtonLoading>
      <ButtonLoading color="accent" variant="solid" :loading="loading" @click="startLoading">
        Control Loading
      </ButtonLoading>
      <Button v-if="loading" color="destructive" @click="endLoading">End Loading</Button>
      <ButtonLoading color="info" variant="ghost" auto-loading :loading-duration="2000">
        Loading end in 2s
      </ButtonLoading>
    </div>
  </Card>
</template>
