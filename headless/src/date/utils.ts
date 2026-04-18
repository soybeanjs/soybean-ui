export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new RangeError('chunk size must be greater than 0');
  }

  const result: T[][] = [];

  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size));
  }

  return result;
}

export function handleCalendarInitialFocus(calendar: HTMLElement) {
  const selectedDay = calendar.querySelector<HTMLElement>('[data-selected]');
  if (selectedDay) {
    selectedDay.focus();
    return;
  }

  const today = calendar.querySelector<HTMLElement>('[data-today]');
  if (today) {
    today.focus();
    return;
  }

  const firstDay = calendar.querySelector<HTMLElement>('[data-slot="cell-trigger"]:not([data-disabled]):not([data-unavailable])');
  firstDay?.focus();
}
