<script setup lang="ts">
import { computed, shallowRef, useTemplateRef } from 'vue';
import { useControllableState } from '../../composables';
import { provideUploadRootContext, useUploadUi } from './context';
import type { UploadFile, UploadRequestOptions, UploadRootEmits, UploadRootProps, UploadStatus } from './types';

defineOptions({
  name: 'UploadRoot'
});

const props = withDefaults(defineProps<UploadRootProps>(), {
  accept: undefined,
  multiple: false,
  maxCount: undefined,
  maxSize: undefined,
  autoUpload: true,
  customRequest: undefined,
  disabled: false,
  fileList: undefined,
  defaultFileList: undefined,
  dir: undefined
});

const emit = defineEmits<UploadRootEmits>();

const rootCls = useUploadUi('root');

const inputRef = useTemplateRef('inputRef');

const files = useControllableState<UploadFile[] | undefined, true>(
  () => props.fileList as UploadFile[] | undefined,
  value => {
    emit('update:fileList', value as UploadFile[]);
  },
  props.defaultFileList ?? [],
  true
);

const dragOver = shallowRef(false);
const disabled = computed(() => props.disabled);

let uidCounter = 0;

function createUid() {
  uidCounter += 1;

  return `upload-${Date.now()}-${uidCounter}`;
}

function toItems(fileList: FileList | File[]): UploadFile[] {
  return Array.from(fileList).map(file => ({
    uid: createUid(),
    name: file.name,
    size: file.size,
    type: file.type,
    status: 'ready' as UploadStatus,
    percent: 0,
    raw: file
  }));
}

function isAccepted(file: File) {
  if (!props.accept) return true;

  const rules = props.accept
    .split(',')
    .map(rule => rule.trim())
    .filter(Boolean);

  return rules.some(rule => {
    if (rule.startsWith('.')) return file.name.toLowerCase().endsWith(rule.toLowerCase());
    if (rule.endsWith('/*')) return file.type.startsWith(rule.slice(0, -1));

    return file.type === rule;
  });
}

function startUpload(item: UploadFile) {
  if (!props.autoUpload) return;

  if (!props.customRequest) {
    item.status = 'success';
    item.percent = 100;

    return;
  }

  item.status = 'uploading';
  item.percent = 0;

  const options: UploadRequestOptions = {
    file: item.raw,
    onProgress: percent => {
      item.percent = Math.min(Math.max(percent, 0), 100);
    },
    onSuccess: () => {
      item.status = 'success';
      item.percent = 100;
    },
    onError: () => {
      item.status = 'error';
    }
  };

  props.customRequest(options);
}

function onAddFiles(fileList: FileList | File[]) {
  if (disabled.value) return;

  const incoming = toItems(fileList).filter(file => {
    if (props.maxSize != null && file.raw.size > props.maxSize) return false;

    return isAccepted(file.raw);
  });

  const maxCount = props.maxCount;
  const current = files.value ?? [];
  const next = maxCount != null ? [...current, ...incoming].slice(0, maxCount) : [...current, ...incoming];

  files.value = next;
  incoming.forEach(startUpload);
}

function onRemove(uid: string) {
  if (disabled.value) return;

  files.value = (files.value ?? []).filter(file => file.uid !== uid);
}

function onRetry(uid: string) {
  const item = (files.value ?? []).find(file => file.uid === uid);

  if (item) startUpload(item);
}

function onOpenFileDialog() {
  if (disabled.value) return;

  inputRef.value?.click();
}

function onInputChange(event: Event) {
  const target = event.target as HTMLInputElement;

  if (target.files) onAddFiles(target.files);

  target.value = '';
}

function onDragEnter() {
  if (!disabled.value) dragOver.value = true;
}

function onDragLeave() {
  dragOver.value = false;
}

function onDrop(event: DragEvent) {
  dragOver.value = false;

  if (disabled.value) return;

  if (event.dataTransfer?.files) onAddFiles(event.dataTransfer.files);
}

provideUploadRootContext({
  files,
  disabled,
  dragOver,
  onOpenFileDialog,
  onAddFiles,
  onRemove,
  onRetry,
  onDragEnter,
  onDragLeave,
  onDrop
});
</script>

<template>
  <div
    data-soybean-upload-root
    :dir="dir"
    :data-disabled="disabled ? '' : undefined"
    :data-drag-over="dragOver ? '' : undefined"
    :class="rootCls"
    @dragenter.prevent="onDragEnter"
    @dragover.prevent
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
  >
    <input
      ref="inputRef"
      data-soybean-upload-input
      type="file"
      hidden
      aria-label="Upload"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="onInputChange"
    />
    <slot />
  </div>
</template>
