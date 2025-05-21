<script setup lang="ts">
import { ref } from 'vue';
import { usePresence } from '../../../src/composables/use-presence';

const isPresent = ref(false);
const elementRef = ref<HTMLElement>();
const isVisible = usePresence(elementRef, isPresent);

const toggle = () => {
  isPresent.value = !isPresent.value;
};
</script>

<template>
  <div class="example-container">
    <h2>usePresence Example</h2>

    <button @click="toggle">{{ isPresent ? 'Hide' : 'Show' }} Element</button>

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
  margin: 1rem auto;
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
