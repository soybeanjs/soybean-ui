import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import type { ThoughtChainItem } from '../types/thought-chain';

/**
 * Options for {@link useThoughtChain}.
 */
export interface UseThoughtChainOptions {
  /** Whether each expandable item is expanded by default. */
  defaultExpand?: boolean;
}

/**
 * The return value of {@link useThoughtChain}.
 */
export interface UseThoughtChainReturn {
  /** The thought chain items (reactive, mutated in place). */
  items: Ref<ThoughtChainItem[]>;
  /** Whether a given item key is expanded. */
  isExpanded: (key: string) => boolean;
  /** Toggle an item's expanded state. */
  toggle: (key: string) => void;
  /** Expand an item. */
  expand: (key: string) => void;
  /** Collapse an item. */
  collapse: (key: string) => void;
}

/**
 * Manages reasoning-step expansion state for an AI thought chain.
 */
export function useThoughtChain(
  initial: ThoughtChainItem[] = [],
  options: UseThoughtChainOptions = {}
): UseThoughtChainReturn {
  const { defaultExpand = false } = options;

  const items = ref<ThoughtChainItem[]>([...initial]);
  const expanded = reactive(new Set<string>());

  if (defaultExpand) {
    for (const item of items.value) expanded.add(item.key);
  }

  const isExpanded = (key: string): boolean => expanded.has(key);

  const toggle = (key: string): void => {
    if (expanded.has(key)) expanded.delete(key);
    else expanded.add(key);
  };

  const expand = (key: string): void => {
    expanded.add(key);
  };

  const collapse = (key: string): void => {
    expanded.delete(key);
  };

  return { items, isExpanded, toggle, expand, collapse };
}
