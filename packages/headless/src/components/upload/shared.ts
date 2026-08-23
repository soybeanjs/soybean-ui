import type { UploadFile } from './types';

/**
 * Format a byte size as a human-readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Resolve the display label of a file's upload status.
 */
export function getUploadStatusLabel(file: UploadFile): string {
  if (file.status === 'uploading') return `${file.percent}%`;
  if (file.status === 'success') return 'Done';
  if (file.status === 'error') return 'Failed';

  return 'Ready';
}
