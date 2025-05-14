<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  count?: number;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'update:count', value: number): void;
}

const emit = defineEmits<Emits>();

type Slots = {
  header?: () => any;
  default?: () => any;
  footer?: (props: { count: number }) => any;
};

defineSlots<Slots>();

const currentCount = ref(props.count || 0);

const handleClick = () => {
  currentCount.value += 1;

  emit('update:count', currentCount.value);
};
</script>

<template>
  <div>
    <slot name="header"></slot>
    <div>
      <div>{{ currentCount }}</div>
      <button @click="handleClick">Click me</button>
    </div>
    <slot></slot>
    <slot name="footer" :count="10"></slot>
  </div>
</template>

<style scoped></style>
