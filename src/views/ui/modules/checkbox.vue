<script setup lang="ts">
import { SButton, SCheckbox } from '@soybean-unify/ui';
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
  <div class="py-12px text-18px">Default Checkbox</div>
  <SCheckbox label="checkbox" />
  <div class="py-12px text-18px">Indeterminate Checkbox</div>
  <div class="flex gap-12px">
    <SCheckbox v-model:checked="checked" label="checkbox" />
    <SButton variant="plain" @click="setTndeterminate">indeterminate</SButton>
  </div>
</template>

<style scoped></style>
