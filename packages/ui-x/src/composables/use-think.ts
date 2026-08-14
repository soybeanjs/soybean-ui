import { ref } from 'vue';
import type { Ref } from 'vue';

/**
 * The return value of {@link useThink}.
 */
export interface UseThinkReturn {
  /** Whether the panel is expanded. */
  open: Ref<boolean>;
  /** Toggle the panel. */
  toggle: () => void;
  /** Collapse the panel. */
  close: () => void;
  /** Expand the panel. */
  openPanel: () => void;
}

/**
 * Collapse / expand state for an AI "thinking" or collapsible content panel.
 */
export function useThink(initialOpen = false): UseThinkReturn {
  const open = ref(initialOpen);

  const toggle = (): void => {
    open.value = !open.value;
  };

  const close = (): void => {
    open.value = false;
  };

  const openPanel = (): void => {
    open.value = true;
  };

  return { open, toggle, close, openPanel };
}
