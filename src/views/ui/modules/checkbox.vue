<script setup lang="ts">
import { SCheckbox } from '@soybean-unify/ui';
import { ref } from 'vue';

defineOptions({
  name: 'UiCheckbox'
});

const checked = ref<boolean | 'indeterminate'>(false);

function setTndeterminate() {
  checked.value = 'indeterminate';
}
</script>

<template>
  <SCheckbox v-model:checked="checked">checkbox</SCheckbox>
  <button @click="setTndeterminate">indeterminate</button>
</template>

<style scoped></style>
