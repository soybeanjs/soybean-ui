import type { Ref } from 'vue';
import type { DateFields, DateValue } from '@internationalized/date';
import { isZonedDateTime, toDate } from './comparators';
import {
  DATE_SEGMENT_PARTS,
  EDITABLE_SEGMENT_PARTS,
  TIME_SEGMENT_PARTS,
  isDateSegmentPart,
  isSegmentPart
} from './parts';
import { getPlaceholder } from './placeholders';
import { getOptsByGranularity } from './utils';
import type {
  DateFormatter,
  DateSegmentPart,
  Granularity,
  HourCycle,
  SegmentContentObj,
  SegmentPart,
  SegmentValueObj,
  TimeSegmentPart
} from './types';

const calendarDateTimeGranularities = ['hour', 'minute', 'second'];

type SyncDateSegmentValuesProps = {
  value: DateValue;
  formatter: DateFormatter;
};

type SyncTimeSegmentValuesProps = {
  value: DateValue;
  formatter: DateFormatter;
};

export function syncTimeSegmentValues(props: SyncTimeSegmentValuesProps) {
  return Object.fromEntries(
    TIME_SEGMENT_PARTS.map(part => {
      if (part === 'dayPeriod') return [part, props.formatter.dayPeriod(toDate(props.value))];
      return [part, props.value[part as keyof DateValue]];
    })
  ) as SegmentValueObj;
}

export function syncSegmentValues(props: SyncDateSegmentValuesProps) {
  const { formatter } = props;

  const dateValues = DATE_SEGMENT_PARTS.map(part => {
    return [part, props.value[part]];
  });
  if ('hour' in props.value) {
    const timeValues = syncTimeSegmentValues({ value: props.value, formatter });

    return { ...Object.fromEntries(dateValues), ...timeValues } as SegmentValueObj;
  }

  return Object.fromEntries(dateValues) as SegmentValueObj;
}

export function initializeTimeSegmentValues(): SegmentValueObj {
  return Object.fromEntries(
    TIME_SEGMENT_PARTS.map(part => {
      if (part === 'dayPeriod') return [part, 'AM'];
      return [part, null];
    }).filter(([key]) => {
      if (key === 'literal' || key === null) return false;
      return true;
    })
  );
}

export function initializeSegmentValues(granularity: Granularity): SegmentValueObj {
  const initialParts = EDITABLE_SEGMENT_PARTS.map(part => {
    if (part === 'dayPeriod') return [part, 'AM'];

    return [part, null];
  }).filter(([key]) => {
    if (key === 'literal' || key === null) return false;
    if (granularity === 'day') return !calendarDateTimeGranularities.includes(key) && key !== 'dayPeriod';
    return true;
  });

  return Object.fromEntries(initialParts);
}

type SharedContentProps = {
  granularity: Granularity;
  dateRef: DateValue;
  formatter: DateFormatter;
  hideTimeZone: boolean;
  hourCycle: HourCycle;
  isTimeValue?: boolean;
};

type CreateContentObjProps = SharedContentProps & {
  segmentValues: SegmentValueObj;
  locale: Ref<string>;
};

type CreateContentArrProps = SharedContentProps & {
  contentObj: SegmentContentObj;
};

function createContentObj(props: CreateContentObjProps) {
  const { segmentValues, formatter, locale } = props;
  function getPartContent(part: DateSegmentPart | TimeSegmentPart) {
    if ('hour' in segmentValues) {
      const value = segmentValues[part];
      if (value !== null) {
        /**
         * Edge case for when the month field is filled and the day field snaps to the maximum value of the value of the
         * placeholder month
         */
        if (part === 'day' && segmentValues.month !== null) {
          return formatter.part(
            props.dateRef.set({ [part as keyof DateFields]: value, month: segmentValues.month }),
            part,
            {
              hourCycle: props.hourCycle === 24 ? 'h23' : undefined
            }
          );
        }
        return formatter.part(props.dateRef.set({ [part]: value }), part, {
          hourCycle: props.hourCycle === 24 ? 'h23' : undefined
        });
      }

      return getPlaceholder(part, '', locale.value);
    }

    if (isDateSegmentPart(part)) {
      const value = segmentValues[part];
      if (value !== null) {
        if (part === 'day' && segmentValues.month !== null)
          /** As described above, same function */
          return formatter.part(props.dateRef.set({ [part]: value, month: segmentValues.month }), part);

        return formatter.part(props.dateRef.set({ [part]: value }), part);
      }

      return getPlaceholder(part, '', locale.value);
    }
    return '';
  }

  const content = Object.keys(segmentValues).reduce((obj, part) => {
    if (!isSegmentPart(part)) return obj;
    if ('hour' in segmentValues && part === 'dayPeriod') {
      const value = segmentValues[part];

      if (value !== null) obj[part] = value;
      else obj[part] = getPlaceholder(part, 'AM', locale.value);
    } else {
      obj[part] = getPartContent(part);
    }

    return obj;
  }, {} as SegmentContentObj);

  return content;
}

function createContentArr(props: CreateContentArrProps) {
  const { granularity, formatter, contentObj, hideTimeZone, hourCycle, isTimeValue } = props;
  const parts = formatter.toParts(props.dateRef, getOptsByGranularity(granularity, hourCycle, isTimeValue));

  const segmentContentArr = parts
    .map(part => {
      const defaultParts = ['literal', 'timeZoneName', null];

      if (defaultParts.includes(part.type) || !isSegmentPart(part.type)) {
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
      if (segment.part === null || segment.value === null) return false;
      if (segment.part === 'timeZoneName' && (!isZonedDateTime(props.dateRef) || hideTimeZone)) return false;

      return true;
    });

  return segmentContentArr;
}

type CreateContentProps = CreateContentObjProps;

export function createContent(props: CreateContentProps) {
  const contentObj = createContentObj(props);

  const contentArr = createContentArr({
    contentObj,
    ...props
  });

  return {
    obj: contentObj,
    arr: contentArr
  };
}
