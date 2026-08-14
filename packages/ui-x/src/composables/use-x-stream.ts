import { ref, shallowRef } from 'vue';
import type { Ref, ShallowRef } from 'vue';

/**
 * Options for parsing a streaming response.
 *
 * The separators mirror the de-facto SSE conventions shared by the reference
 * AI libraries (a part separates key-value pairs on a line, and an empty line
 * separates events). They are configurable so any protocol can be consumed.
 */
export interface StreamParserOptions {
  /** Separator between individual parts (key-value lines). Defaults to `\n`. */
  partSeparator?: string;
  /** Separator between events. Defaults to `\n\n`. */
  streamSeparator?: string;
  /** Separator between a key and its value. Defaults to `:`. */
  kvSeparator?: string;
}

/**
 * Options for {@link useXStream}.
 */
export interface UseXStreamOptions {
  /** Separator / parser configuration. */
  parser?: StreamParserOptions;
}

/**
 * The return value of {@link useXStream}.
 */
export interface UseXStreamReturn<T> {
  /** The latest parsed chunk, or `null` before the first chunk. */
  data: ShallowRef<T | null>;
  /** Any error thrown while reading the stream. */
  error: ShallowRef<unknown>;
  /** Whether a stream is currently being consumed. */
  loading: Ref<boolean>;
  /** Start consuming a readable stream. */
  start: (stream: ReadableStream<Uint8Array>) => Promise<void>;
  /** Cancel the current stream. */
  cancel: () => void;
}

const DEFAULT_SEPARATOR = '\n';
const DEFAULT_STREAM_SEPARATOR = '\n\n';
const DEFAULT_KV_SEPARATOR = ':';

/**
 * A transport-agnostic streaming parser.
 *
 * Consumes any `ReadableStream<Uint8Array>`, decodes text, splits it into
 * events using the configured separators, and exposes the latest chunk plus
 * lifecycle state. It does not know about any specific AI provider — feed it a
 * raw stream and it yields parsed chunks.
 */
export function useXStream<T>(options: UseXStreamOptions = {}): UseXStreamReturn<T> {
  const { parser = {} } = options;

  const data = shallowRef<T | null>(null);
  const error = shallowRef<unknown>(null);
  const loading = ref(false);

  let controller: AbortController | null = null;

  const start = async (stream: ReadableStream<Uint8Array>): Promise<void> => {
    controller = new AbortController();
    loading.value = true;
    error.value = null;

    const partSeparator = parser.partSeparator ?? DEFAULT_SEPARATOR;
    const streamSeparator = parser.streamSeparator ?? DEFAULT_STREAM_SEPARATOR;
    const kvSeparator = parser.kvSeparator ?? DEFAULT_KV_SEPARATOR;

    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split(streamSeparator);
        // The final fragment may be incomplete — keep it in the buffer.
        buffer = events.pop() ?? '';

        for (const event of events) {
          const chunk = parseEvent<T>(event, partSeparator, kvSeparator);
          if (chunk !== null) data.value = chunk;
        }
      }

      // Flush the trailing buffer if it forms a complete event.
      const trailing = parseEvent<T>(buffer, partSeparator, kvSeparator);
      if (trailing !== null) data.value = trailing;
    } catch (caught) {
      error.value = caught;
    } finally {
      loading.value = false;
      reader.releaseLock();
      controller = null;
    }
  };

  const cancel = (): void => {
    controller?.abort();
  };

  return { data, error, loading, start, cancel };
}

function parseEvent<T>(event: string, partSeparator: string, kvSeparator: string): T | null {
  const trimmed = event.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(partSeparator);
  const record: Record<string, string> = {};

  for (const part of parts) {
    const index = part.indexOf(kvSeparator);
    if (index === -1) continue;

    const key = part.slice(0, index).trim();
    const value = part.slice(index + kvSeparator.length).trim();
    if (key) record[key] = value;
  }

  return record as unknown as T;
}
