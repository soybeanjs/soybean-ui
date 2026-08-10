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
    selectRow: 'Select row {row}',
    filterSelected: '{count} selected',
    filterKeywordActive: 'Keyword active',
    filterOptionsCount: '{count} options',
    filterNoOptions: 'No filter options',
    filterEdit: 'Edit filter for {column}',
    filter: 'Filter {column}',
    filterSearch: 'Search filter options for {column}',
    filterNoMatching: 'No matching options',
    filterClear: 'Clear',
    filterSelect: 'Select {label}',
    filterSearchPlaceholder: 'Search {column}'
  },
  calendar: {
    prevPage: 'Previous page',
    nextPage: 'Next page',
    selectMonth: 'Select month',
    selectYear: 'Select year'
  },
  datePicker: {
    toggle: 'Open calendar',
    popupLabel: 'Choose date'
  },
  dateRangePicker: {
    toggle: 'Open calendar',
    popupLabel: 'Choose date range'
  },
  cascader: {
    clear: 'Clear value',
    noResults: 'No data',
    removeTag: 'Remove {label}',
    search: 'Search'
  },
  clipboard: {
    copy: 'Copy',
    copied: 'Copied'
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
  treeMenu: {
    openActions: 'Open {label} actions'
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
    step: 'Step {step}',
    ariaLabel: 'Step-by-step progress',
    stepOf: 'Step {current} of {total}'
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
  },
  themeCustomizer: {
    sections: {
      mode: 'Mode',
      palette: 'Palette',
      base: 'Base',
      primary: 'Primary',
      radius: 'Radius',
      size: 'Size',
      scheme: 'Scheme',
      feedback: 'Feedback',
      chart: 'Chart',
      sidebar: 'Sidebar',
      advanced: 'Advanced',
      theme: 'Theme',
      custom: 'Custom',
      menu: 'Menu',
      levels: 'Levels',
      lightLevel: 'Light Level',
      darkLevel: 'Dark Level',
      menuColor: 'Menu Color',
      menuAccent: 'Menu Accent',
      savePresetPlaceholder: 'Enter preset name',
      save: 'Save',
      cssVars: 'CSS Variable Theme',
      reset: 'Reset'
    },
    groups: {
      surfaces: 'Surfaces',
      palette: 'Palette',
      hairlines: 'Hairlines',
      sidebar: 'Sidebar',
      charts: 'Charts',
      feedback: 'Feedback'
    },
    variants: {
      background: 'Background',
      foreground: 'Foreground',
      card: 'Card',
      cardForeground: 'Card Foreground',
      popover: 'Popover',
      popoverForeground: 'Popover Foreground',
      primary: 'Primary',
      primaryForeground: 'Primary Foreground',
      ring: 'Ring',
      secondary: 'Secondary',
      secondaryForeground: 'Secondary Foreground',
      muted: 'Muted',
      mutedForeground: 'Muted Foreground',
      accent: 'Accent',
      accentForeground: 'Accent Foreground',
      border: 'Border',
      input: 'Input',
      sidebar: 'Sidebar',
      sidebarForeground: 'Sidebar Foreground',
      sidebarPrimary: 'Sidebar Primary',
      sidebarPrimaryForeground: 'Sidebar Primary Foreground',
      sidebarAccent: 'Sidebar Accent',
      sidebarAccentForeground: 'Sidebar Accent Foreground',
      sidebarBorder: 'Sidebar Border',
      sidebarRing: 'Sidebar Ring',
      chart1: 'Chart 1',
      chart2: 'Chart 2',
      chart3: 'Chart 3',
      chart4: 'Chart 4',
      chart5: 'Chart 5',
      destructive: 'Destructive',
      destructiveForeground: 'Destructive Foreground',
      success: 'Success',
      successForeground: 'Success Foreground',
      warning: 'Warning',
      warningForeground: 'Warning Foreground',
      info: 'Info',
      infoForeground: 'Info Foreground',
      carbon: 'Carbon',
      carbonForeground: 'Carbon Foreground'
    },
    options: {
      mode: {
        auto: 'Auto',
        light: 'Light',
        dark: 'Dark'
      },
      level: {
        lightness: 'Lightness',
        darkness: 'Darkness'
      },
      size: {
        xs: 'XS',
        sm: 'SM',
        md: 'MD',
        lg: 'LG',
        xl: 'XL',
        xl2: '2XL'
      },
      palette: {
        slate: 'Slate',
        mist: 'Mist',
        gray: 'Gray',
        zinc: 'Zinc',
        neutral: 'Neutral',
        stone: 'Stone',
        taupe: 'Taupe',
        olive: 'Olive',
        mauve: 'Mauve',
        red: 'Red',
        orange: 'Orange',
        amber: 'Amber',
        yellow: 'Yellow',
        lime: 'Lime',
        green: 'Green',
        emerald: 'Emerald',
        teal: 'Teal',
        cyan: 'Cyan',
        sky: 'Sky',
        blue: 'Blue',
        indigo: 'Indigo',
        violet: 'Violet',
        purple: 'Purple',
        fuchsia: 'Fuchsia',
        pink: 'Pink',
        rose: 'Rose'
      },
      feedback: {
        classic: 'Classic',
        vivid: 'Vivid',
        subtle: 'Subtle',
        modern: 'Modern',
        professional: 'Professional'
      },
      chart: {
        vivid: 'Vivid',
        cool: 'Cool',
        warm: 'Warm',
        natural: 'Natural',
        minimal: 'Minimal'
      },
      sidebar: {
        derived: 'Derived',
        invertedDark: 'Inverted Dark',
        soft: 'Soft',
        contrast: 'Contrast'
      },
      menuColor: {
        default: 'Default',
        inverted: 'Inverted',
        defaultTranslucent: 'Default Translucent',
        invertedTranslucent: 'Inverted Translucent'
      },
      menuAccent: {
        subtle: 'Subtle',
        bold: 'Bold'
      }
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
