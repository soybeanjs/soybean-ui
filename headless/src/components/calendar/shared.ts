import { compareYearMonth } from '../../date/comparators';
import type { DateValue } from '../../date';
import type { CalendarRootSlotProps } from './types';

export function getMonthOptions(
  options: Pick<CalendarRootSlotProps, 'formatter' | 'placeholder' | 'disabled' | 'minValue' | 'maxValue'>
) {
  const { formatter, placeholder, disabled, minValue, maxValue } = options;

  return formatter.getMonths().map(item => ({
    disabled: isMonthDisabled(placeholder.set({ day: 1, month: item.value }), { disabled, minValue, maxValue }),
    label: item.label,
    value: item.value
  }));
}

export function getYearOptions(options: Pick<CalendarRootSlotProps, 'placeholder' | 'minValue' | 'maxValue'>) {
  const { placeholder, minValue, maxValue } = options;

  const startYear = normalizeMonthBoundary(minValue)?.year ?? placeholder.year - 100;
  const endYear = normalizeMonthBoundary(maxValue)?.year ?? placeholder.year + 100;

  return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    const year = startYear + index;

    return {
      label: String(year),
      value: year
    };
  });
}

export function handleMonthChange(
  value: number | undefined,
  options: Pick<CalendarRootSlotProps, 'placeholder' | 'disabled' | 'minValue' | 'maxValue'> & {
    onPlaceholderChange: (date: DateValue) => void;
  }
) {
  if (value === undefined) {
    return;
  }
  const { placeholder, onPlaceholderChange, disabled, minValue, maxValue } = options;

  const nextDate = placeholder.set({ day: 1, month: value });

  if (isMonthDisabled(nextDate, { disabled, minValue, maxValue })) {
    return;
  }

  updatePlaceholder(nextDate, onPlaceholderChange, minValue, maxValue);
}

export function handleYearChange(
  value: number | undefined,
  options: Pick<CalendarRootSlotProps, 'placeholder' | 'minValue' | 'maxValue'> & {
    onPlaceholderChange: (date: DateValue) => void;
  }
) {
  if (value === undefined) {
    return;
  }

  const { placeholder, onPlaceholderChange, minValue, maxValue } = options;

  updatePlaceholder(placeholder.set({ day: 1, year: value }), onPlaceholderChange, minValue, maxValue);
}

function updatePlaceholder(
  date: DateValue,
  onPlaceholderChange: (date: DateValue) => void,
  minValue?: DateValue,
  maxValue?: DateValue
) {
  onPlaceholderChange(clampPlaceholder(date, minValue, maxValue));
}

function clampPlaceholder(date: DateValue, minValue?: DateValue, maxValue?: DateValue) {
  const nextDate = date.set({ day: 1 });
  const normalizedMinValue = normalizeMonthBoundary(minValue);
  const normalizedMaxValue = normalizeMonthBoundary(maxValue);

  if (normalizedMinValue && compareYearMonth(nextDate, normalizedMinValue) < 0) {
    return normalizedMinValue.copy();
  }

  if (normalizedMaxValue && compareYearMonth(nextDate, normalizedMaxValue) > 0) {
    return normalizedMaxValue.copy();
  }

  return nextDate.copy();
}

function isMonthDisabled(date: DateValue, options: Pick<CalendarRootSlotProps, 'disabled' | 'minValue' | 'maxValue'>) {
  const { disabled, minValue, maxValue } = options;

  if (disabled) {
    return true;
  }

  const normalizedMinValue = normalizeMonthBoundary(minValue);
  const normalizedMaxValue = normalizeMonthBoundary(maxValue);

  if (normalizedMinValue && compareYearMonth(date, normalizedMinValue) < 0) {
    return true;
  }

  if (normalizedMaxValue && compareYearMonth(date, normalizedMaxValue) > 0) {
    return true;
  }

  return false;
}

function normalizeMonthBoundary(date?: DateValue) {
  return date?.set({ day: 1 });
}
