import { onBeforeUnmount, onMounted, shallowRef } from 'vue';
import { isClient } from '../shared';

let subscribers = 0;
const isUsingKeyboardRef = shallowRef(false);
let isListening = false;

function handlePointer() {
  isUsingKeyboardRef.value = false;
}

function handleKeyDown() {
  isUsingKeyboardRef.value = true;
}

function addEventListeners() {
  if (!isClient || isListening) return;

  document.addEventListener('keydown', handleKeyDown, { capture: true, passive: true });
  document.addEventListener('pointerdown', handlePointer, { capture: true, passive: true });
  document.addEventListener('pointermove', handlePointer, { capture: true, passive: true });
  isListening = true;
}

function removeEventListeners() {
  if (!isClient || !isListening) return;

  document.removeEventListener('keydown', handleKeyDown, { capture: true });
  document.removeEventListener('pointerdown', handlePointer, { capture: true });
  document.removeEventListener('pointermove', handlePointer, { capture: true });
  isListening = false;
}

export function useIsUsingKeyboard() {
  let isSubscribed = false;

  onMounted(() => {
    if (!isSubscribed) {
      subscribers++;
      isSubscribed = true;

      // 只有第一个订阅者时才添加事件监听器
      if (subscribers === 1) {
        addEventListeners();
      }
    }
  });

  onBeforeUnmount(() => {
    if (isSubscribed) {
      subscribers = Math.max(0, subscribers - 1);
      isSubscribed = false;

      // 最后一个订阅者取消时移除事件监听器
      if (subscribers === 0) {
        removeEventListeners();
        // 重置状态
        isUsingKeyboardRef.value = false;
      }
    }
  });

  return isUsingKeyboardRef;
}
