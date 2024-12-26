import { computed, onMounted, reactive } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import type { BuiltinKeyboardKey, KeyboardKeyProps, SpecificKeyboardKeyMap } from './types';

export const builtinKeyboardKeyMap: Record<BuiltinKeyboardKey, string> = {
  meta: '',
  ctrl: '',
  alt: '',
  win: '⊞',
  command: '⌘',
  shift: '⇧',
  option: '⌥',
  enter: '↵',
  delete: '⌦',
  backspace: '⌫',
  escape: '⎋',
  tab: '⇥',
  capslock: '⇪',
  arrowup: '↑',
  arrowright: '→',
  arrowdown: '↓',
  arrowleft: '←',
  pageup: '⇞',
  pagedown: '⇟',
  home: '↖',
  end: '↘'
};

function _useKeyboardKey() {
  const macOS = computed(() => navigator && navigator.userAgent && navigator.userAgent.match(/Macintosh;/));

  const specificKeyboardKeyMap: SpecificKeyboardKeyMap = reactive({
    meta: ' ',
    alt: ' ',
    ctrl: ' '
  });

  function getKeyboardKey(value?: KeyboardKeyProps['value']) {
    if (!value) {
      return;
    }

    if (['meta', 'alt', 'ctrl'].includes(value)) {
      return specificKeyboardKeyMap[value as keyof SpecificKeyboardKeyMap];
    }

    return builtinKeyboardKeyMap[value as BuiltinKeyboardKey] || value.toUpperCase();
  }

  onMounted(() => {
    specificKeyboardKeyMap.meta = macOS.value ? builtinKeyboardKeyMap.command : builtinKeyboardKeyMap.win;
    specificKeyboardKeyMap.alt = macOS.value ? builtinKeyboardKeyMap.option : 'alt';
    specificKeyboardKeyMap.ctrl = macOS.value ? '⌃' : 'ctrl';
  });

  return {
    macOS,
    getKeyboardKey
  };
}

export const useKeyboardKey = createSharedComposable(_useKeyboardKey);
