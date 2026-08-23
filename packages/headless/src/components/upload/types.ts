import type { ComputedRef, ShallowRef } from 'vue';
import type { BaseProps, Direction, UiClass } from '../../types';

/**
 * The upload status of a file.
 */
export type UploadStatus = 'ready' | 'uploading' | 'success' | 'error';

/**
 * A file tracked by the upload component.
 */
export interface UploadFile {
  /** A stable unique id for the file. */
  uid: string;
  /** The file name. */
  name: string;
  /** The file size in bytes. */
  size: number;
  /** The MIME type of the file. */
  type: string;
  /** The upload status. */
  status: UploadStatus;
  /** The upload progress, 0–100. */
  percent: number;
  /** An optional URL for previews (image mode). */
  url?: string;
  /** The underlying native file. */
  raw: File;
}

/**
 * Options passed to a custom upload request.
 */
export interface UploadRequestOptions {
  /** The file to upload. */
  file: File;
  /** Report upload progress (0–100). */
  onProgress: (percent: number) => void;
  /** Report a successful upload. */
  onSuccess: (response?: unknown) => void;
  /** Report an upload error. */
  onError: (error?: unknown) => void;
}

/**
 * A custom request adapter. Use XHR, fetch, or a third-party storage SDK.
 */
export type UploadCustomRequest = (options: UploadRequestOptions) => void;

/**
 * Properties for the UploadRoot component.
 */
export interface UploadRootProps extends BaseProps {
  /**
   * Accepted file types, following the native `accept` syntax
   * (e.g. `.png,.jpg` or `image/*`).
   */
  accept?: string;
  /**
   * Whether multiple files can be selected.
   */
  multiple?: boolean;
  /**
   * The maximum number of files.
   */
  maxCount?: number;
  /**
   * The maximum file size in bytes.
   */
  maxSize?: number;
  /**
   * Whether to start the upload automatically after selection.
   *
   * @default true
   */
  autoUpload?: boolean;
  /**
   * A custom request adapter. When omitted files are added without an upload.
   */
  customRequest?: UploadCustomRequest;
  /**
   * Whether the upload is disabled.
   */
  disabled?: boolean;
  /**
   * The controlled file list.
   */
  fileList?: UploadFile[];
  /**
   * The initial file list when uncontrolled.
   */
  defaultFileList?: UploadFile[];
  /**
   * The reading direction.
   */
  dir?: Direction;
}

/**
 * Events for the UploadRoot component.
 */
export type UploadRootEmits = {
  /**
   * Emitted when the file list changes.
   */
  'update:fileList': [files: UploadFile[]];
};

/**
 * Properties for the UploadTrigger component.
 */
export interface UploadTriggerProps extends BaseProps {}

/**
 * Properties for the UploadFileList component.
 */
export interface UploadFileListProps extends BaseProps {}

/**
 * Properties for the UploadFileItem component.
 */
export interface UploadFileItemProps extends BaseProps {
  /** The file to render. */
  file: UploadFile;
}

/**
 * Context for the UploadRoot component.
 */
export interface UploadRootContext {
  /** The tracked file list. */
  files: ShallowRef<UploadFile[] | undefined>;
  /** Whether the upload is disabled. */
  disabled: ComputedRef<boolean>;
  /** Whether a drag is currently over the dropzone. */
  dragOver: ShallowRef<boolean>;
  /** Open the native file dialog. */
  onOpenFileDialog: () => void;
  /** Add files from the native input or a drop. */
  onAddFiles: (fileList: FileList | File[]) => void;
  /** Remove a file by uid. */
  onRemove: (uid: string) => void;
  /** Re-upload a failed file. */
  onRetry: (uid: string) => void;
  /** Mark drag-over. */
  onDragEnter: () => void;
  /** Clear drag-over. */
  onDragLeave: () => void;
  /** Handle a drop event. */
  onDrop: (event: DragEvent) => void;
}

/**
 * Properties for the UploadCompact component.
 */
export interface UploadCompactProps extends UploadRootProps {
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: UploadTriggerProps;
  /**
   * Properties forwarded to the file list element.
   */
  fileListProps?: UploadFileListProps;
}

/**
 * Events for the UploadCompact component.
 */
export type UploadCompactEmits = UploadRootEmits;

/**
 * Slots for the UploadCompact component.
 */
export type UploadCompactSlots = {
  /**
   * The trigger content (button or dropzone area).
   */
  default?: () => any;
  /**
   * Custom file item rendering.
   */
  item?: (props: { file: UploadFile; remove: (uid: string) => void; retry: (uid: string) => void }) => any;
};

/**
 * Available UI slots for the Upload component.
 */
export type UploadUiSlot =
  | 'root'
  | 'input'
  | 'trigger'
  | 'fileList'
  | 'fileItem'
  | 'filePreview'
  | 'fileInfo'
  | 'fileStatus'
  | 'fileAction';

/**
 * UI class overrides for the Upload component.
 */
export type UploadUi = UiClass<UploadUiSlot>;
