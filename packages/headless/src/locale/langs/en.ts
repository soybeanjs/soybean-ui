import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: 'First page',
    prevPage: 'Previous page',
    nextPage: 'Next page',
    lastPage: 'Last page',
    pageLabel: 'Page {value}'
  },
  pageTabs: {
    closeTab: 'Close tab',
    pinTab: 'Pin tab',
    unpinTab: 'Unpin tab'
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
    nextPage: 'Next page',
    selectMonth: 'Select month',
    selectYear: 'Select year'
  },
  layout: {
    toggleSidebar: 'Toggle Sidebar'
  },
  input: {
    clear: 'Clear input'
  },
  inputNumber: {
    increment: 'Increase',
    decrement: 'Decrease',
    clear: 'Clear value'
  },
  textarea: {
    clear: 'Clear textarea'
  },
  tagsInput: {
    addTag: 'Add tag',
    clear: 'Clear tags'
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
    noResults: 'No results found.',
    options: 'Options'
  },
  command: {
    noResults: 'No results found.'
  },
  dialog: {
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  rating: {
    ariaLabel: 'Rating',
    starN: '{count} of {max} stars',
    empty: 'No rating'
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

const en: LocaleRegistry = {
  name: 'English',
  key: 'en',
  dir: 'ltr',
  messages
};

export default en;
