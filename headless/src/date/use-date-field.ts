import type { CalendarDateTime, DateFields, DateValue, TimeFields } from '@internationalized/date';
import type { Ref } from 'vue';

import type { Formatter } from './formatter';
import type { AnyExceptLiteral, DateStep, HourCycle, SegmentPart, SegmentValueObj } from './types';

import { DateFormatter } from '@internationalized/date';
import { computed } from 'vue';

import { snapValueToStep } from '../shared';
import { getDaysInMonth } from './comparators';
import { isAcceptableSegmentKey, isNumberString, isSegmentNavigationKey } from './segment';

type SegmentAttrProps = {
  disabled: boolean;
  segmentValues: SegmentValueObj;
  hourCycle: HourCycle;
  placeholder: DateValue;
  formatter: Formatter;
};

const commonSegmentAttrs = (props: SegmentAttrProps) => ({
  role: 'spinbutton',
  contenteditable: true,
  tabindex: props.disabled ? undefined : 0,
  spellcheck: false,
  inputmode: 'numeric',
  autocorrect: 'off',
  enterkeyhint: 'next',
  style: 'caret-color: transparent;'
});

const segmentBuilders = {
  day: {
    attrs: (props: SegmentAttrProps) => ({
      ...commonSegmentAttrs(props),
      'aria-label': 'day,',
      'aria-valuemin': 1,
      'aria-valuemax': getDaysInMonth(props.placeholder),
      'aria-valuenow': props.placeholder.day,
      'aria-valuetext': props.segmentValues.day === null ? 'Empty' : `${props.placeholder.day}`,
      'data-placeholder': props.segmentValues.day === null ? '' : undefined
    })
  },
  month: {
    attrs: (props: SegmentAttrProps) => ({
      ...commonSegmentAttrs(props),
      'aria-label': 'month, ',
      'aria-valuemin': 1,
      'aria-valuemax': 12,
      'aria-valuenow': props.placeholder.month,
      'aria-valuetext': props.segmentValues.month === null ? 'Empty' : `${props.placeholder.month} - ${props.formatter.fullMonth(props.placeholder.toDate('UTC'))}`,
      'data-placeholder': props.segmentValues.month === null ? '' : undefined
    })
  },
  year: {
    attrs: (props: SegmentAttrProps) => ({
      ...commonSegmentAttrs(props),
      'aria-label': 'year, ',
      'aria-valuemin': 1,
      'aria-valuemax': 9999,
      'aria-valuenow': props.placeholder.year,
      'aria-valuetext': props.segmentValues.year === null ? 'Empty' : `${props.placeholder.year}`,
      'data-placeholder': props.segmentValues.year === null ? '' : undefined
    })
  },
  hour: { attrs: (props: SegmentAttrProps) => commonSegmentAttrs(props) },
  minute: { attrs: (props: SegmentAttrProps) => commonSegmentAttrs(props) },
  second: { attrs: (props: SegmentAttrProps) => commonSegmentAttrs(props) },
  dayPeriod: { attrs: (props: SegmentAttrProps) => ({ ...commonSegmentAttrs(props), inputmode: 'text' }) },
  literal: { attrs: () => ({ 'aria-hidden': true, 'data-segment': 'literal' }) },
  timeZoneName: { attrs: (props: SegmentAttrProps) => ({ role: 'textbox', tabindex: props.disabled ? undefined : 0, 'data-readonly': true, style: 'caret-color: transparent;' }) }
} as const;

export type UseDateFieldProps = {
  hasLeftFocus: Ref<boolean>;
  lastKeyZero: Ref<boolean>;
  placeholder: Ref<DateValue>;
  hourCycle: HourCycle;
  step: Ref<DateStep>;
  formatter: Formatter;
  segmentValues: Ref<SegmentValueObj>;
  disabled: Ref<boolean>;
  readonly: Ref<boolean>;
  part: SegmentPart;
  modelValue: Ref<DateValue | undefined>;
  focusNext: () => void;
};

export function useDateField(props: UseDateFieldProps) {
  const attributes = computed(() => segmentBuilders[props.part]?.attrs({
    disabled: props.disabled.value,
    placeholder: props.placeholder.value,
    hourCycle: props.hourCycle,
    segmentValues: props.segmentValues.value,
    formatter: props.formatter
  }) ?? {});

  const deleteValue = (prevValue: number | null) => {
    props.hasLeftFocus.value = false;
    if (prevValue === null) {
      return prevValue;
    }

    const str = prevValue.toString();
    if (str.length === 1) {
      props.modelValue.value = undefined;
      return null;
    }

    return Number.parseInt(str.slice(0, -1));
  };

  const cycleValue = (
    event: KeyboardEvent,
    part: keyof Omit<DateFields, 'era'> | keyof TimeFields,
    dateRef: DateValue,
    prevValue: number | null,
    max = 59
  ) => {
    const step = props.step.value[part] ?? 1;
    const sign = event.key === 'ArrowUp' ? step : -step;

    if (prevValue === null) {
      return sign > 0 ? 0 : max;
    }

    return (dateRef as CalendarDateTime).set({ [part]: prevValue }).cycle(part as keyof TimeFields, sign)[part as keyof TimeFields] as number;
  };

  const uses12HourFormat = (locale: string) => {
    const hourCycle = new DateFormatter(locale, { hour: 'numeric' }).resolvedOptions().hourCycle;
    return hourCycle === 'h11' || hourCycle === 'h12';
  };

        const updateNumericSegment = (part: Exclude<SegmentPart, 'literal' | 'timeZoneName' | 'dayPeriod'>, event: KeyboardEvent) => {
          const segmentValues = props.segmentValues.value as Record<string, number | 'AM' | 'PM' | null>;
          const current = segmentValues[part] as number | null;

          if (event.key === 'Backspace') {
            segmentValues[part] = deleteValue(current);
            return;
          }

          if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            const max = part === 'month' ? 12 : part === 'day' ? 31 : part === 'year' ? 9999 : 59;
            segmentValues[part] = cycleValue(event, part as keyof TimeFields, props.placeholder.value, current, max);
            return;
          }

    if (!isNumberString(event.key)) {
      return;
    }

    const input = Number.parseInt(event.key);
    const previous = props.hasLeftFocus.value ? null : current;
    props.hasLeftFocus.value = false;

    let nextValue = previous === null ? input : Number.parseInt(`${previous}${input}`);

    if (part === 'hour') {
      const is12Hour = props.hourCycle !== undefined ? props.hourCycle === 12 : uses12HourFormat(props.formatter.getLocale());
      const maxHour = is12Hour ? 12 : 23;
      if (nextValue > maxHour) {
        nextValue = input;
      }
    } else if (part === 'month' && nextValue > 12) {
      nextValue = input;
    } else if (part === 'day') {
      const month = props.segmentValues.value.month ?? 1;
      const maxDay = getDaysInMonth(props.placeholder.value.set({ month }));
      if (nextValue > maxDay) {
        nextValue = input;
      }
    }

    if (part === 'minute' && props.step.value.minute && props.step.value.minute > 1) {
      nextValue = snapValueToStep(nextValue, 0, 59, props.step.value.minute);
    }

    if (part === 'second' && props.step.value.second && props.step.value.second > 1) {
      nextValue = snapValueToStep(nextValue, 0, 59, props.step.value.second);
    }

          segmentValues[part] = nextValue;

    if (previous !== null) {
      props.focusNext();
    }

    if (Object.values(props.segmentValues.value).every(value => value !== null)) {
      const dateRef = props.placeholder.value.set({ ...props.segmentValues.value as Record<AnyExceptLiteral, number> });
      props.modelValue.value = dateRef.copy();
    }
  };

  const handleSegmentClick = (event: MouseEvent) => {
    if (props.disabled.value) {
      event.preventDefault();
    }
  };

  const handleSegmentKeydown = (event: KeyboardEvent) => {
    if (props.disabled.value || props.readonly.value) {
      return;
    }

    if (!isAcceptableSegmentKey(event.key) || isSegmentNavigationKey(event.key)) {
      return;
    }

    if (event.key !== 'Tab') {
      event.preventDefault();
    }

    if (props.part === 'dayPeriod') {
      if ('dayPeriod' in props.segmentValues.value && 'hour' in props.segmentValues.value && props.segmentValues.value.hour !== null) {
        if (['a', 'A'].includes(event.key)) {
          props.segmentValues.value.dayPeriod = 'AM';
        } else if (['p', 'P'].includes(event.key)) {
          props.segmentValues.value.dayPeriod = 'PM';
        }
      }
      return;
    }

    if (props.part === 'literal' || props.part === 'timeZoneName') {
      return;
    }

    updateNumericSegment(props.part, event);
  };

  const handleSegmentFocusOut = () => {
    if (!Object.values(props.segmentValues.value).every(value => value !== null)) {
      return;
    }

    const dateRef = props.placeholder.value.set({ ...props.segmentValues.value as Record<AnyExceptLiteral, number> });
    props.modelValue.value = dateRef.copy();
  };

  return {
    attributes,
    handleSegmentClick,
    handleSegmentFocusOut,
    handleSegmentKeydown
  };
}
