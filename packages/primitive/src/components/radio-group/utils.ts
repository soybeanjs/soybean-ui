import { handleAndDispatchCustomEvent } from '../../_shared';
import type { AcceptableValue } from '../../_shared/types';

export type SelectEvent = CustomEvent<{ originalEvent: MouseEvent; value?: AcceptableValue }>;
export const RADIO_SELECT = 'radio.select';

export function handleSelect(
  event: MouseEvent,
  value: AcceptableValue | undefined,
  callback: (event: SelectEvent) => void
) {
  const eventDetail = { originalEvent: event, value };
  handleAndDispatchCustomEvent(RADIO_SELECT, callback, eventDetail);
}
