<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { UploadCompact, provideUploadUi } from '@soybeanjs/headless/upload';
import type { UploadFile } from '@soybeanjs/headless/upload';
import { uploadVariants } from '@/styles/upload';
import type { UploadProps } from './types';

defineOptions({
  name: 'SUpload'
});

const props = withDefaults(defineProps<UploadProps>(), {
  autoUpload: true,
  disabled: false,
  size: 'md'
});

const emit = defineEmits<{ 'update:fileList': [files: UploadFile[]] }>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const slots = defineSlots();

const ui = computed(() => uploadVariants({ size: props.size }, props.ui, { root: props.class }));

provideUploadUi(ui);
</script>

<template>
  <UploadCompact v-bind="forwardedProps" @update:file-list="emit('update:fileList', $event)">
    <template v-for="(_, slotName) in slots" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UploadCompact>
</template>
