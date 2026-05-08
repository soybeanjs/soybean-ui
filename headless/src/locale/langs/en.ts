import type { LocaleMessages } from '../types';

export const en: LocaleMessages = {
  pagination: {
    firstPage: 'First page',
    prevPage: 'Previous page',
    nextPage: 'Next page',
    lastPage: 'Last page'
  },
  table: {
    emptyTitle: 'No data',
    emptyDescription: 'There is no data to display.',
    selectAllRows: 'Select all rows',
    sortByColumn: 'Sort by {column}',
    sortByColumnAsc: 'Sort by {column}, currently ascending',
    sortByColumnDesc: 'Sort by {column}, currently descending',
    resizeColumn: 'Resize {column} column',
    expandRow: 'Expand row {row}',
    collapseRow: 'Collapse row {row}',
    selectRow: 'Select row {row}'
  },
  calendar: {
    prevPage: 'Previous page',
    nextPage: 'Next page'
  },
  layout: {
    toggleSidebar: 'Toggle Sidebar'
  },
  inputNumber: {
    increment: 'Increase',
    decrement: 'Decrease',
    clear: 'Clear value'
  },
  textarea: {
    clear: 'Clear textarea'
  },
  progress: {
    loading: 'Loading'
  },
  anchor: {
    nav: 'Anchor'
  },
  breadcrumb: {
    nav: 'breadcrumb'
  },
  stepper: {
    step: 'Step {step}'
  },
  editable: {
    cancel: 'Cancel',
    edit: 'Edit',
    submit: 'Submit'
  },
  combobox: {
    clearInput: 'Clear input',
    noResults: 'No results found.',
    search: 'Search',
    options: 'Options'
  },
  autocomplete: {
    toggleSuggestions: 'Toggle suggestions',
    clearInput: 'Clear input',
    noResults: 'No results found.'
  },
  command: {
    noResults: 'No results found.'
  },
  slider: {
    valueN: 'Value {index} of {total}',
    minimum: 'Minimum',
    maximum: 'Maximum'
  },
  password: {
    clearInput: 'Clear input',
    showPassword: 'Show password',
    hidePassword: 'Hide password'
  },
  date: {
    daySegment: 'day,',
    monthSegment: 'month, ',
    yearSegment: 'year, ',
    hourSegment: 'hour, ',
    minuteSegment: 'minute, ',
    secondSegment: 'second, ',
    dayPeriodSegment: 'AM/PM, ',
    timeZoneSegment: 'time zone, ',
    empty: 'Empty',
    placeholder: {
      year: 'yyyy',
      month: 'mm',
      day: 'dd',
      time: '––'
    }
  }
};
