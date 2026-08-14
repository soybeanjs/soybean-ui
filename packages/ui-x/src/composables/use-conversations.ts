import { computed, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type { ConversationItem } from '../types/conversation';

/**
 * The return value of {@link useConversations}.
 */
export interface UseConversationsReturn {
  /** The full conversation list. */
  conversations: Ref<ConversationItem[]>;
  /** The currently active conversation id, or `null`. */
  activeId: Ref<string | null>;
  /** Conversations grouped by `group` (stable insertion order). */
  grouped: ComputedRef<{ group: string; items: ConversationItem[] }[]>;
  /** Select a conversation. */
  select: (id: string) => void;
  /** Add a conversation (and optionally select it). */
  add: (item: ConversationItem, select?: boolean) => void;
  /** Remove a conversation; clears selection if it was active. */
  remove: (id: string) => void;
}

/**
 * Manages a conversation list with grouping and active selection.
 */
export function useConversations(initial: ConversationItem[] = []): UseConversationsReturn {
  const conversations = ref<ConversationItem[]>([...initial]);
  const activeId = ref<string | null>(null);

  const grouped = computed(() => {
    const map = new Map<string, ConversationItem[]>();

    for (const item of conversations.value) {
      const key = item.group ?? '';
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    }

    return [...map.entries()].map(([group, items]) => ({ group, items }));
  });

  const select = (id: string): void => {
    activeId.value = id;
  };

  const add = (item: ConversationItem, selectItem = false): void => {
    conversations.value = [...conversations.value, item];
    if (selectItem) activeId.value = item.id;
  };

  const remove = (id: string): void => {
    conversations.value = conversations.value.filter(item => item.id !== id);
    if (activeId.value === id) activeId.value = null;
  };

  watch(activeId, id => {
    // Guard against selecting a removed conversation.
    if (id !== null && !conversations.value.some(item => item.id === id)) {
      activeId.value = null;
    }
  });

  return { conversations, activeId, grouped, select, add, remove };
}
