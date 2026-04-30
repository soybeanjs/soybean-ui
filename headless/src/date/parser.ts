import type { Ref } from 'vue';

import type { Formatter } from './formatter';
import type { TimeValue } from './comparators';
import type { DateSegmentPart, Granularity, HourCycle, SegmentContentObj, SegmentPart, SegmentValueObj, TimeSegmentPart } from './types';

import { isTime, isZonedDateTime, toDate } from './comparators';
import { DATE_SEGMENT_PARTS, EDITABLE_SEGMENT_PARTS, TIME_SEGMENT_PARTS, isDateSegmentPart, isSegmentPart } from './parts';
import { getPlaceholder } from './placeholders';
import { getOptsByGranularity, normalizeHourCycle } from './utils';

type CreateContentProps = {
  granularity: Granularity;
  dateRef: import('./types').DateValue | TimeValue;
  formatter: Formatter;
  hideTimeZone: boolean;
  hourCycle: HourCycle;
  segmentValues: SegmentValueObj;
  locale: Ref<string>;
  isTimeValue?: boolean;
};

export function syncTimeSegmentValues(props: { value: import('./types').DateValue | TimeValue; formatter: Formatter }) {
  return Object.fromEntries(
    TIME_SEGMENT_PARTS.map(part => {
      if (part === 'dayPeriod') {
        return [part, props.formatter.dayPeriod(toDate(props.value))];
      }

      return [part, props.value[part as keyof typeof props.value]];
    })
  ) as SegmentValueObj;
}

export function syncSegmentValues(props: { value: import('./types').DateValue; formatter: Formatter }) {
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

function createContentObj(props: CreateContentProps) {
  const numericSegmentValues = props.segmentValues as Record<string, number | 'AM' | 'PM' | null>;
  const getPartContent = (part: DateSegmentPart | TimeSegmentPart) => {
    if ('hour' in props.segmentValues) {
      const value = numericSegmentValues[part];
      if (value !== null) {
        if (part === 'day') {
          return props.formatter.part(
            props.dateRef.set({
              [part]: value as number,
              month: 'month' in props.segmentValues ? props.segmentValues.month ?? 1 : 1
            }),
            part,
            { hourCycle: normalizeHourCycle(props.hourCycle) }
          );
        }

        return props.formatter.part(props.dateRef.set({ [part]: value as number }), part, {
          hourCycle: normalizeHourCycle(props.hourCycle)
        });
      }

      return getPlaceholder(part, '', props.locale.value);
    }

    if (isDateSegmentPart(part)) {
      const value = numericSegmentValues[part];
      if (value !== null) {
        if (part === 'day') {
          return props.formatter.part(props.dateRef.set({ [part]: value as number, month: props.segmentValues.month ?? 1 }), part);
        }

        return props.formatter.part(props.dateRef.set({ [part]: value as number }), part);
      }

      return getPlaceholder(part, '', props.locale.value);
    }

    return '';
  };

  return Object.keys(props.segmentValues).reduce((content, part) => {
    if (!isSegmentPart(part)) {
      return content;
    }

    if ('hour' in props.segmentValues && part === 'dayPeriod') {
      content[part] = props.segmentValues[part] ?? getPlaceholder(part, 'AM', props.locale.value);
      return content;
    }

    content[part] = createContentValue(part as DateSegmentPart | TimeSegmentPart, getPartContent);
    return content;
  }, {} as SegmentContentObj);
}

function createContentValue(part: DateSegmentPart | TimeSegmentPart, getPartContent: (part: DateSegmentPart | TimeSegmentPart) => string) {
  return getPartContent(part);
}

export function createContent(props: CreateContentProps) {
  const contentObj = createContentObj(props);
  const parts = props.formatter.toParts(props.dateRef, getOptsByGranularity(props.granularity, props.hourCycle, props.isTimeValue));
  const arr = parts
    .map(part => {
      if ((part.type === 'literal' || part.type === 'timeZoneName' || part.type === null) || !isSegmentPart(part.type)) {
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

      if (segment.part === 'timeZoneName' && (isTime(props.dateRef) || !isZonedDateTime(props.dateRef))) {
        return false;
      }

      if (segment.part === 'timeZoneName' && props.hideTimeZone) {
        return false;
      }

      return true;
    });

  return { obj: contentObj, arr };
}
