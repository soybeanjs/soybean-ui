<script setup lang="ts">
import { SButton, useSonner } from '@soybeanjs/ui';

const sonner = useSonner();

function showPromise() {
  const promise = new Promise<{ name: string }>(resolve => {
    setTimeout(() => resolve({ name: 'Sonner' }), 2000);
  });

  sonner.promise(promise, {
    loading: 'Loading...',
    success: data => `${data.name} has been loaded`,
    error: 'Error loading data'
  });
}

function showWithAction() {
  sonner('Event has been created', {
    action: {
      label: 'Undo',
      onClick: () => sonner('Undo successful')
    }
  });
}
</script>

<template>
  <div>
    <h3 class="playground-title">Action</h3>
    <div class="flex flex-wrap gap-3">
      <SButton variant="pure" @click="showWithAction">
        With Action
      </SButton>
      <SButton variant="pure" @click="showPromise">
        Promise
      </SButton>
    </div>
  </div>
</template>
