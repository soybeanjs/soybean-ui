import type { Ref } from 'vue';
import type { LocaleDateMessages } from '../locale/types';
import { getOptsByGranularity, normalizeHourCycle } from './utils';
import { isTime, isZonedDateTime, toDate } from './comparators';
import type { Formatter } from './formatter';
import {
  DATE_SEGMENT_PARTS,
  EDITABLE_SEGMENT_PARTS,
  TIME_SEGMENT_PARTS,
  isDateSegmentPart,
  isSegmentPart
} from './parts';
import { getPlaceholder } from './placeholders';
import type {
  DateSegmentPart,
  DateValue,
  TimeValue,
  Granularity,
  HourCycle,
  SegmentContentObj,
  SegmentPart,
  SegmentValueObj,
  TimeSegmentPart
} from './types';

export function syncTimeSegmentValues(props: { value: DateValue | TimeValue; formatter: Formatter }) {
  return Object.fromEntries(
    TIME_SEGMENT_PARTS.map(part => {
      if (part === 'dayPeriod') {
        return [part, props.formatter.dayPeriod(toDate(props.value))];
      }

      return [part, props.value[part as keyof typeof props.value]];
    })
  ) as SegmentValueObj;
}

export function syncSegmentValues(props: { value: DateValue; formatter: Formatter }) {
  const dateValues = DATE_SEGMENT_PARTS.map(part => [part, props.value[part]]);

  if ('hour' in props.value) {
    return { ...Object.fromEntries(dateValues), ...syncTimeSegmentValues(props) } as SegmentValueObj;
  }

  return Object.fromEntries(dateValues) as SegmentValueObj;
}

export function initializeSegmentValues(granularity: Granularity): SegmentValueObj {
  const timeGranularities = ['hour', 'minute', 'second'];
  const initialParts = EDITABLE_SEGMENT_PARTS.map(part => {
    if (part === 'dayPeriod') {
      return [part, 'AM'];
    }

    return [part, null];
  }).filter(([key]) => {
    if (granularity === 'minute' && key === 'second') {
      return false;
    }

    if (granularity === 'hour' && (key === 'second' || key === 'minute')) {
      return false;
    }

    if (granularity === 'day') {
      return !timeGranularities.includes(key as string) && key !== 'dayPeriod';
    }

    return true;
  });

  return Object.fromEntries(initialParts) as SegmentValueObj;
}

type CreateContentOptions = {
  granularity: Granularity;
  dateRef: DateValue | TimeValue;
  formatter: Formatter;
  hideTimeZone: boolean;
  hourCycle: HourCycle;
  segmentValues: SegmentValueObj;
  locale: Ref<string>;
  isTimeValue?: boolean;
  dateMessages?: LocaleDateMessages;
};

function createContentObj(options: CreateContentOptions) {
  const { segmentValues, dateRef, formatter, hourCycle, locale } = options;

  const resolvePlaceholder = (part: DateSegmentPart | TimeSegmentPart): string => {
    const m = options.dateMessages;
    if (m) {
      if (part === 'year') return m.placeholder.year;
      if (part === 'month') return m.placeholder.month;
      if (part === 'day') return m.placeholder.day;
      return m.placeholder.time;
    }
    return getPlaceholder(part, '', locale.value);
  };

  const numericSegmentValues = segmentValues as Record<string, number | 'AM' | 'PM' | null>;
  const getPartContent = (part: DateSegmentPart | TimeSegmentPart) => {
    if ('hour' in segmentValues) {
      const value = numericSegmentValues[part];
      if (value !== null) {
        if (part === 'day') {
          return formatter.part(
            dateRef.set({
              [part]: value as number,
              month: 'month' in segmentValues ? (segmentValues.month ?? 1) : 1
            }),
            part,
            { hourCycle: normalizeHourCycle(hourCycle) }
          );
        }

        return formatter.part(dateRef.set({ [part]: value as number }), part, {
          hourCycle: normalizeHourCycle(hourCycle)
        });
      }

      return resolvePlaceholder(part);
    }

    if (isDateSegmentPart(part)) {
      const value = numericSegmentValues[part];
      if (value !== null) {
        if (part === 'day') {
          return formatter.part(dateRef.set({ [part]: value as number, month: segmentValues.month ?? 1 }), part);
        }

        return formatter.part(dateRef.set({ [part]: value as number }), part);
      }

      return resolvePlaceholder(part);
    }

    return '';
  };

  return Object.keys(segmentValues).reduce((content, part) => {
    if (!isSegmentPart(part)) {
      return content;
    }

    if ('hour' in segmentValues && part === 'dayPeriod') {
      content[part] = segmentValues[part] ?? getPlaceholder(part, 'AM', locale.value);
      return content;
    }

    content[part] = createContentValue(part as DateSegmentPart | TimeSegmentPart, getPartContent);
    return content;
  }, {} as SegmentContentObj);
}

function createContentValue(
  part: DateSegmentPart | TimeSegmentPart,
  getPartContent: (part: DateSegmentPart | TimeSegmentPart) => string
) {
  return getPartContent(part);
}

export function createContent(options: CreateContentOptions) {
  const { formatter, dateRef, hourCycle, hideTimeZone } = options;

  const contentObj = createContentObj(options);
  const parts = formatter.toParts(dateRef, getOptsByGranularity(options.granularity, hourCycle, options.isTimeValue));
  const arr = parts
    .map(part => {
      if (part.type === 'literal' || part.type === 'timeZoneName' || part.type === null || !isSegmentPart(part.type)) {
        return {
          part: part.type,
          value: part.value
        };
      }

      return {
        part: part.type,
        value: contentObj[part.type]
      };
    })
    .filter((segment): segment is { part: SegmentPart; value: string } => {
      if (segment.part === null || segment.value === null) {
        return false;
      }

      if (segment.part === 'timeZoneName' && (isTime(dateRef) || !isZonedDateTime(dateRef))) {
        return false;
      }

      if (segment.part === 'timeZoneName' && hideTimeZone) {
        return false;
      }

      return true;
    });

  return { obj: contentObj, arr };
}
