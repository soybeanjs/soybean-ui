<script setup lang="ts">
import { useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import { useUploadUi } from './context';
import type { UploadCompactEmits, UploadCompactProps, UploadCompactSlots, UploadFile } from './types';
import UploadFileItem from './upload-file-item.vue';
import UploadFileList from './upload-file-list.vue';
import UploadRoot from './upload-root.vue';
import UploadTrigger from './upload-trigger.vue';

defineOptions({
  name: 'UploadCompact'
});

const props = withDefaults(defineProps<UploadCompactProps>(), {
  accept: undefined,
  multiple: false,
  maxCount: undefined,
  maxSize: undefined,
  autoUpload: true,
  customRequest: undefined,
  disabled: false,
  fileList: undefined,
  defaultFileList: undefined,
  triggerProps: undefined,
  fileListProps: undefined,
  dir: undefined
});

const emit = defineEmits<UploadCompactEmits>();

defineSlots<UploadCompactSlots>();

const forwardedProps = useOmitProps(props, ['triggerProps', 'fileListProps']);

const filePreviewCls = useUploadUi('filePreview');
const fileInfoCls = useUploadUi('fileInfo');
const fileActionCls = useUploadUi('fileAction');

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getStatusLabel = (file: UploadFile) => {
  if (file.status === 'uploading') return `${file.percent}%`;
  if (file.status === 'success') return 'Done';
  if (file.status === 'error') return 'Failed';

  return 'Ready';
};
</script>

<template>
  <UploadRoot v-bind="forwardedProps" @update:file-list="emit('update:fileList', $event)">
    <UploadTrigger v-bind="triggerProps">
      <slot />
    </UploadTrigger>
    <UploadFileList v-bind="fileListProps">
      <template #default="{ files }">
        <UploadFileItem v-for="file in files" :key="file.uid" :file="file">
          <template #default="slotProps">
            <slot name="item" v-bind="slotProps">
              <span data-soybean-upload-file-preview :class="filePreviewCls">
                <Icon icon="lucide:file" />
              </span>
              <span data-soybean-upload-file-info :class="fileInfoCls">
                <span>{{ file.name }}</span>
                <span>{{ formatSize(file.size) }} · {{ getStatusLabel(file) }}</span>
              </span>
              <button
                type="button"
                data-soybean-upload-file-action
                :class="fileActionCls"
                :aria-label="`Remove ${file.name}`"
                @click="slotProps.remove(file.uid)"
              >
                <Icon icon="lucide:x" />
              </button>
            </slot>
          </template>
        </UploadFileItem>
      </template>
    </UploadFileList>
  </UploadRoot>
</template>
