import { computed, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';

/**
 * A suggestion item shown in the mention / slash popover.
 */
export interface SenderSuggestion {
  /** Unique key. */
  key: string;
  /** Display label. */
  label: string;
  /** Optional description. */
  description?: string;
  /** Optional avatar / icon hint. */
  icon?: string;
}

/**
 * The type of an active trigger: a slash command (`/`) or a mention (`@`).
 */
export type SenderTrigger = 'slash' | 'mention';

/**
 * Options for {@link useSender}.
 */
export interface UseSenderOptions {
  /** Trigger characters. Slash defaults to `/`, mention defaults to `@`. */
  slashChar?: string;
  mentionChar?: string;
  /** Suggestion list for slash commands. */
  slashSuggestions?: SenderSuggestion[];
  /** Suggestion list for mentions. */
  mentionSuggestions?: SenderSuggestion[];
}

/**
 * The return value of {@link useSender}.
 */
export interface UseSenderReturn {
  /** The current input value. */
  value: Ref<string>;
  /** The active trigger type, or `null`. */
  activeTrigger: Ref<SenderTrigger | null>;
  /** The query after the trigger character (for filtering suggestions). */
  query: ComputedRef<string>;
  /** Suggestions to show for the active trigger. */
  suggestions: ComputedRef<SenderSuggestion[]>;
  /** Whether the suggestion popover should be visible. */
  open: ComputedRef<boolean>;
  /** Set the input value. */
  setValue: (value: string) => void;
  /** Select a suggestion (inserts it and closes the popover). */
  select: (suggestion: SenderSuggestion) => void;
  /** Close the suggestion popover. */
  close: () => void;
}

function findTrigger(
  text: string,
  chars: string[],
  start: number,
  end: number
): { char: string; queryStart: number } | null {
  for (let i = start; i <= end; i += 1) {
    if (chars.includes(text[i] ?? '')) {
      // Only treat as a trigger if preceded by whitespace or start-of-string.
      const prev = text[i - 1];
      if (i === 0 || !prev || /\s/.test(prev)) {
        return { char: text[i], queryStart: i + 1 };
      }
    }
  }
  return null;
}

/**
 * Manages the AI composer input state: value, slash (`/`) and mention (`@`)
 * trigger detection, query extraction, and suggestion selection.
 */
export function useSender(options: UseSenderOptions = {}): UseSenderReturn {
  const slashChar = options.slashChar ?? '/';
  const mentionChar = options.mentionChar ?? '@';

  const value = ref('');

  const slashSuggestions = ref<SenderSuggestion[]>(options.slashSuggestions ?? []);
  const mentionSuggestions = ref<SenderSuggestion[]>(options.mentionSuggestions ?? []);

  const activeTrigger = ref<SenderTrigger | null>(null);
  const queryStart = ref(-1);

  const query = computed(() => {
    if (activeTrigger.value === null || queryStart.value === -1) return '';
    return value.value.slice(queryStart.value);
  });

  const suggestions = computed<SenderSuggestion[]>(() => {
    const list = activeTrigger.value === 'slash' ? slashSuggestions.value : mentionSuggestions.value;
    const q = query.value.toLowerCase();
    if (!q) return list;
    return list.filter(item => item.label.toLowerCase().includes(q) || item.key.toLowerCase().includes(q));
  });

  const open = computed(() => activeTrigger.value !== null && suggestions.value.length > 0);

  const setValue = (next: string): void => {
    value.value = next;

    // Detect a trigger near the end of the text (the caret region).
    const start = Math.max(0, next.length - 32);
    const trigger = findTrigger(next, [slashChar, mentionChar], start, next.length - 1);

    if (trigger && trigger.char === slashChar) {
      activeTrigger.value = 'slash';
      queryStart.value = trigger.queryStart;
    } else if (trigger && trigger.char === mentionChar) {
      activeTrigger.value = 'mention';
      queryStart.value = trigger.queryStart;
    } else {
      activeTrigger.value = null;
      queryStart.value = -1;
    }
  };

  const select = (suggestion: SenderSuggestion): void => {
    if (activeTrigger.value === null || queryStart.value === -1) return;

    const prefix = value.value.slice(0, queryStart.value - 1); // drop the trigger char
    const suffix = value.value.slice(value.value.length);
    value.value = `${prefix}${suggestion.label}${suffix}`;
    activeTrigger.value = null;
    queryStart.value = -1;
  };

  const close = (): void => {
    activeTrigger.value = null;
    queryStart.value = -1;
  };

  watch(open, isOpen => {
    if (!isOpen) queryStart.value = -1;
  });

  return { value, activeTrigger, query, suggestions, open, setValue, select, close };
}
