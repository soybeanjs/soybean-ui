<script setup lang="ts">
import { computed } from 'vue';
import { Slot } from '@soybean-ui/primitives';
import { useFormField } from '../hooks';

defineOptions({
  name: 'SFormControl'
});

const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

const ariaDescribedBy = computed(() => (error.value ? `${formDescriptionId} ${formMessageId}` : formDescriptionId));

const ariaInvalid = computed(() => Boolean(error.value));
</script>

<template>
  <Slot :id="formItemId" :aria-described-by="ariaDescribedBy" :aria-invalid="ariaInvalid">
    <slot />
  </Slot>
</template>
