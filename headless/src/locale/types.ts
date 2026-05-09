export interface LocaleAnchorMessages {
  /** Aria-label for the anchor `<nav>` landmark. */
  nav: string;
}

export interface LocaleBreadcrumbMessages {
  /** Aria-label for the breadcrumb `<nav>` landmark. */
  nav: string;
}

export interface LocaleAutocompleteMessages {
  /** Aria-label for the suggestions toggle trigger. */
  toggleSuggestions: string;
  /** Default aria-label for the clear button. */
  clearInput: string;
  /** Default text for the empty state. */
  noResults: string;
}

export interface LocaleCalendarMessages {
  /** Aria-label and default slot content for the "previous page" button. */
  prevPage: string;
  /** Aria-label and default slot content for the "next page" button. */
  nextPage: string;
}

export interface LocaleComboboxMessages {
  /** Default aria-label for the clear button. */
  clearInput: string;
  /** Default text for the empty state. */
  noResults: string;
  /** Fallback aria-label for the search input. */
  search: string;
  /** Fallback aria-label for the options viewport. */
  options: string;
}

export interface LocaleCommandMessages {
  /** Default text for the empty state. */
  noResults: string;
}

export interface LocaleDatePlaceholderMessages {
  /**
   * Placeholder shown in the year segment when empty.
   */
  year: string;
  /**
   * Placeholder shown in the month segment when empty.
   */
  month: string;
  /**
   * Placeholder shown in the day segment when empty.
   */
  day: string;
  /**
   * Placeholder shown in time segments (hour/minute/second) when empty.
   */
  time: string;
}

export interface LocaleDateMessages {
  /** Aria-label for the day segment. */
  daySegment: string;
  /** Aria-label for the month segment. */
  monthSegment: string;
  /** Aria-label for the year segment. */
  yearSegment: string;
  /** Aria-label for the hour segment. */
  hourSegment: string;
  /** Aria-label for the minute segment. */
  minuteSegment: string;
  /** Aria-label for the second segment. */
  secondSegment: string;
  /** Aria-label for the AM/PM (day period) segment. */
  dayPeriodSegment: string;
  /** Aria-label for the time zone segment. */
  timeZoneSegment: string;
  /** Aria-valuetext for an empty/unfilled segment. */
  empty: string;
  /**
   * Placeholders for date segments when empty. These are used by the date and time field components to populate the segment placeholders, and should be kept in sync with the `dataPlaceholders` messages.
   */
  placeholder: LocaleDatePlaceholderMessages;
}

export interface LocaleEditableMessages {
  /** Default aria-label and slot content for the cancel trigger. */
  cancel: string;
  /** Default aria-label and slot content for the edit trigger. */
  edit: string;
  /** Default aria-label and slot content for the submit trigger. */
  submit: string;
}

export interface LocaleInputNumberMessages {
  /** Aria-label for the increment button. */
  increment: string;
  /** Aria-label for the decrement button. */
  decrement: string;
  /** Aria-label for the clear button. */
  clear: string;
}

export interface LocaleLayoutMessages {
  /** Aria-label and title for the sidebar toggle trigger/rail. */
  toggleSidebar: string;
}

export interface LocalePaginationMessages {
  /**
   * Aria-label and default slot content for the "first page" button.
   */
  firstPage: string;
  /**
   * Aria-label and default slot content for the "previous page" button.
   */
  prevPage: string;
  /**
   * Aria-label and default slot content for the "next page" button.
   */
  nextPage: string;
  /**
   * Aria-label and default slot content for the "last page" button.
   */
  lastPage: string;
}

export interface LocalePasswordMessages {
  /** Fallback aria-label for the clear button. */
  clearInput: string;
  /** Aria-label for the visibility toggle when password is hidden. */
  showPassword: string;
  /** Aria-label for the visibility toggle when password is visible. */
  hidePassword: string;
}

export interface LocaleProgressMessages {
  /** Aria-label for the progress bar. */
  loading: string;
}

export interface LocaleSliderMessages {
  /**
   * Aria-label template for a thumb when there are more than two values.
   * Supports `{index}` (1-based) and `{total}` placeholders.
   */
  valueN: string;
  /** Aria-label for the minimum thumb in a range slider. */
  minimum: string;
  /** Aria-label for the maximum thumb in a range slider. */
  maximum: string;
}

export interface LocaleStepperMessages {
  /**
   * Default slot content for the step indicator.
   * Supports `{step}` placeholder.
   */
  step: string;
}

export interface LocaleTableMessages {
  /** Title shown in the empty-state slot when there are no rows. */
  emptyTitle: string;
  /** Description shown in the empty-state slot when there are no rows. */
  emptyDescription: string;
  /** Aria-label for the "select all rows" header checkbox. */
  selectAllRows: string;
  /**
   * Aria-label template for the sort button when no sort is active.
   * Supports `{column}` placeholder.
   */
  sortByColumn: string;
  /**
   * Aria-label template for the sort button when sort is ascending.
   * Supports `{column}` placeholder.
   */
  sortByColumnAsc: string;
  /**
   * Aria-label template for the sort button when sort is descending.
   * Supports `{column}` placeholder.
   */
  sortByColumnDesc: string;
  /**
   * Aria-label template for the column resize handle.
   * Supports `{column}` placeholder.
   */
  resizeColumn: string;
  /**
   * Aria-label template for expanding a row.
   * Supports `{row}` placeholder.
   */
  expandRow: string;
  /**
   * Aria-label template for collapsing a row.
   * Supports `{row}` placeholder.
   */
  collapseRow: string;
  /**
   * Aria-label template for selecting a row.
   * Supports `{row}` placeholder.
   */
  selectRow: string;
}

export interface LocaleTagsInputMessages {
  /** Fallback aria-label for the input element. */
  addTag: string;
  /** Aria-label for the clear button. */
  clear: string;
}

export interface LocaleTextareaMessages {
  /** Aria-label for the clear button. */
  clear: string;
}

export interface LocaleMessages {
  anchor: LocaleAnchorMessages;
  autocomplete: LocaleAutocompleteMessages;
  breadcrumb: LocaleBreadcrumbMessages;
  calendar: LocaleCalendarMessages;
  combobox: LocaleComboboxMessages;
  command: LocaleCommandMessages;
  date: LocaleDateMessages;
  editable: LocaleEditableMessages;
  inputNumber: LocaleInputNumberMessages;
  layout: LocaleLayoutMessages;
  pagination: LocalePaginationMessages;
  password: LocalePasswordMessages;
  progress: LocaleProgressMessages;
  slider: LocaleSliderMessages;
  stepper: LocaleStepperMessages;
  table: LocaleTableMessages;
  tagsInput: LocaleTagsInputMessages;
  textarea: LocaleTextareaMessages;
}

export type LocaleMessagesOverrides = {
  [K in keyof LocaleMessages]?: Partial<LocaleMessages[K]>;
};
