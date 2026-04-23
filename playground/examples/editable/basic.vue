<script setup lang="ts">
import { ref } from 'vue';
import { SEditable } from '@soybeanjs/ui';
import type { EditableEventState } from '@soybeanjs/ui';

const value = ref('Click to edit your display name');
const state = ref<EditableEventState | 'preview'>('preview');

function onStateChange(nextState: EditableEventState) {
  state.value = nextState;
}

function onSubmit() {
  state.value = 'preview';
}
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <div class="flex-c gap-3 w-100 lt-md:w-auto">
      <SEditable
        v-model="value"
        placeholder="Enter your display name"
        @submit="onSubmit"
        @update:state="onStateChange"
      />
      <div class="text-sm text-muted-foreground">Value: {{ value }}</div>
      <div class="text-xs text-muted-foreground">State: {{ state }}</div>
    </div>
  </div>
</template>
