<script setup lang="ts">
import { ref } from 'vue';
import { usePresence } from '@headless/composables/use-presence';

const isPresent = ref(false);
const elementRef = ref<HTMLElement>();
const isVisible = usePresence(elementRef, isPresent);

const toggle = () => {
  isPresent.value = !isPresent.value;
};
</script>

<template>
  <div>
    <h2 class="text-xl font-bold">usePresence</h2>

    <button
      class="inline-flex items-center justify-center border border-border bg-background text-accent-foreground rd-2 hover:bg-accent/60 active:bg-accent font-medium transition-all-200 focus-visible:(outline-none ring-2 ring-offset-2 ring-offset-background) disabled:(pointer-events-none opacity-50)"
      @click="toggle"
    >
      {{ isPresent ? 'Hide' : 'Show' }} Element
    </button>

    <div v-if="isVisible" ref="elementRef" class="animated-element" :class="{ exit: !isPresent }">
      This element is {{ isPresent ? 'present' : 'animating out' }}
    </div>
  </div>
</template>

<style scoped>
.example-container {
  padding: 2rem;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 8px;
  margin: 1rem;
}

button {
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  font-size: 1rem;
  cursor: pointer;
}

.animated-element {
  padding: 1rem;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  width: 200px;
  text-align: center;
  animation: fadeIn 0.3s ease-in-out;
}

.animated-element.exit {
  animation: fadeOut 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
}
</style>
