<script setup lang="ts">
import { computed } from 'vue';
import { Slot } from 'reka-ui';
import { useFormField } from './hooks';

const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

const ariaDescribedBy = computed(() => (error.value ? `${formDescriptionId} ${formMessageId}` : formDescriptionId));

const ariaInvalid = computed(() => Boolean(error.value));
</script>

<template>
  <Slot :id="formItemId" :aria-described-by :aria-invalid>
    <slot />
  </Slot>
</template>

<style scoped></style>
