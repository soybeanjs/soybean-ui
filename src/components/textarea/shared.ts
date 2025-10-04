import type { TextareaAutosizeOptions } from './types';

export function calculateLineHeight(element: HTMLTextAreaElement): number {
  const computedStyle = window.getComputedStyle(element);
  const lineHeight = computedStyle.lineHeight;

  if (lineHeight === 'normal') {
    // 如果是 normal，通常约为 font-size 的 1.2 倍
    const fontSize = Number.parseFloat(computedStyle.fontSize);
    return fontSize * 1.2;
  }

  return Number.parseFloat(lineHeight);
}

export function adjustHeight(textarea?: HTMLTextAreaElement | null, autosizeOptions?: TextareaAutosizeOptions) {
  if (!autosizeOptions || !textarea) return;

  const computedStyle = window.getComputedStyle(textarea);
  const paddingTop = Number.parseFloat(computedStyle.paddingTop);
  const paddingBottom = Number.parseFloat(computedStyle.paddingBottom);

  // 获取单行高度
  const lineHeight = calculateLineHeight(textarea);

  // 临时设置高度为 auto 以获取真实的 scrollHeight
  textarea.style.height = 'auto';

  // 获取内容的实际高度
  let height = textarea.scrollHeight;

  // 如果设置了 minRows
  if (autosizeOptions.minRows) {
    const minHeight = lineHeight * autosizeOptions.minRows + paddingTop + paddingBottom;
    height = Math.max(height, minHeight);
  }

  // 如果设置了 maxRows
  if (autosizeOptions.maxRows) {
    const maxHeight = lineHeight * autosizeOptions.maxRows + paddingTop + paddingBottom;
    height = Math.min(height, maxHeight);
  }

  // 设置最终高度
  textarea.style.height = `${height}px`;

  // 根据是否超出最大高度设置 overflow
  if (autosizeOptions.maxRows && textarea.scrollHeight > height) {
    textarea.style.overflowY = 'auto';
  } else {
    textarea.style.overflowY = 'hidden';
  }
}
