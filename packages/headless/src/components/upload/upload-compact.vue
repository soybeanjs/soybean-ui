<script setup lang="ts">
import { useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import { formatFileSize, getUploadStatusLabel } from './shared';
import { useUploadUi } from './context';
import type { UploadCompactEmits, UploadCompactProps, UploadCompactSlots } from './types';
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
const fileStatusCls = useUploadUi('fileStatus');
const fileActionCls = useUploadUi('fileAction');
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
                <span data-soybean-upload-file-status :data-status="file.status" :class="fileStatusCls">
                  {{ formatFileSize(file.size) }} · {{ getUploadStatusLabel(file) }}
                </span>
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
