/**
 * The lifecycle status of a chat message.
 *
 * `local` messages originate on the client (not yet acknowledged by the model),
 * `loading` / `updating` / `success` describe a streaming assistant message,
 * and `error` / `abort` mark a failed or cancelled request.
 */
export type MessageStatus = 'local' | 'loading' | 'updating' | 'success' | 'error' | 'abort';
