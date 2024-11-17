/*
 * Implementation ported from https://github.com/melt-ui/melt-ui/blob/develop/src/lib/builders/date-field/_internal/helpers.ts
 */

import type {
  DateSegmentPart,
  EditableSegmentPart,
  NonEditableSegmentPart,
  SegmentPart,
  TimeSegmentPart
} from './types';

export const DATE_SEGMENT_PARTS: DateSegmentPart[] = ['day', 'month', 'year'];
export const TIME_SEGMENT_PARTS: TimeSegmentPart[] = ['hour', 'minute', 'second', 'dayPeriod'];
export const NON_EDITABLE_SEGMENT_PARTS: NonEditableSegmentPart[] = ['literal', 'timeZoneName'];
export const EDITABLE_SEGMENT_PARTS: EditableSegmentPart[] = [...DATE_SEGMENT_PARTS, ...TIME_SEGMENT_PARTS];
export const EDITABLE_TIME_SEGMENT_PARTS: TimeSegmentPart[] = [...TIME_SEGMENT_PARTS];
export const ALL_SEGMENT_PARTS: SegmentPart[] = [...EDITABLE_SEGMENT_PARTS, ...NON_EDITABLE_SEGMENT_PARTS];
export const ALL_EXCEPT_LITERAL_PARTS = ALL_SEGMENT_PARTS.filter(part => part !== 'literal');

export function isDateSegmentPart(part: unknown): part is DateSegmentPart {
  return DATE_SEGMENT_PARTS.includes(part as DateSegmentPart);
}

export function isTimeSegmentPart(part: unknown): part is TimeSegmentPart {
  return TIME_SEGMENT_PARTS.includes(part as TimeSegmentPart);
}

export function isSegmentPart(part: string): part is EditableSegmentPart {
  return EDITABLE_SEGMENT_PARTS.includes(part as EditableSegmentPart);
}

export function isAnySegmentPart(part: unknown): part is SegmentPart {
  return ALL_SEGMENT_PARTS.includes(part as EditableSegmentPart);
}
