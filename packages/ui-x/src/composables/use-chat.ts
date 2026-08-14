import { ref } from 'vue';
import type { Ref } from 'vue';
import type { ChatMessage } from '../types/chat-message';

/**
 * Options for {@link useChat}.
 */
export interface UseChatOptions {
  /** A function that performs the request for a user message and returns a readable stream. */
  onRequest: (message: ChatMessage) => Promise<ReadableStream<Uint8Array> | Response | undefined>;
  /** The initial message history. */
  initialMessages?: ChatMessage[];
}

/**
 * The return value of {@link useChat}.
 */
export interface UseChatReturn {
  /** The current message history (reactive array, mutated in place). */
  messages: Ref<ChatMessage[]>;
  /** Whether a request is currently in flight. */
  isRequesting: Ref<boolean>;
  /** Append a user message and start a request. */
  send: (content: string) => Promise<void>;
  /** Abort the current request. */
  abort: () => void;
}

let sequence = 0;

function nextId(): string {
  sequence += 1;
  return `msg-${Date.now()}-${sequence}`;
}

/**
 * High-level chat state.
 *
 * Appends a user message, invokes the consumer-provided request handler, then
 * streams the response body into a single assistant message whose `content`
 * is mutated in place while tokens arrive.
 */
export function useChat(options: UseChatOptions): UseChatReturn {
  const messages = ref<ChatMessage[]>(options.initialMessages ?? []);
  const isRequesting = ref(false);

  let abortController: AbortController | null = null;

  const send = async (content: string): Promise<void> => {
    if (isRequesting.value || !content.trim()) return;

    const userMessage: ChatMessage = { id: nextId(), role: 'user', content, status: 'local' };
    const assistantMessage: ChatMessage = { id: nextId(), role: 'ai', content: '', status: 'loading' };

    messages.value.push(userMessage, assistantMessage);
    isRequesting.value = true;

    abortController = new AbortController();

    try {
      const stream = await options.onRequest(userMessage);
      if (!stream) {
        assistantMessage.status = 'error';
        return;
      }

      const body = stream instanceof Response ? stream.body : stream;
      if (!body) {
        assistantMessage.status = 'error';
        return;
      }

      await readInto(body, assistantMessage, abortController.signal);
      assistantMessage.status = abortController.signal.aborted ? 'abort' : 'success';
    } catch {
      assistantMessage.status = 'error';
    } finally {
      isRequesting.value = false;
      abortController = null;
    }
  };

  const abort = (): void => {
    abortController?.abort();
  };

  return { messages, isRequesting, send, abort };
}

async function readInto(stream: ReadableStream<Uint8Array>, message: ChatMessage, signal: AbortSignal): Promise<void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      if (signal.aborted) return;

      const { done, value } = await reader.read();
      if (done) return;

      message.content += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}
