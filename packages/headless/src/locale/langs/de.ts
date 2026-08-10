import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: 'Erste Seite',
    prevPage: 'Vorherige Seite',
    nextPage: 'Nächste Seite',
    lastPage: 'Letzte Seite',
    pageLabel: 'Seite {value}'
  },
  pageTabs: {
    closeTab: 'Tab schließen',
    pinTab: 'Tab anheften',
    unpinTab: 'Tab lösen'
  },
  table: {
    emptyTitle: 'Keine Daten',
    emptyDescription: 'Es sind keine Daten zum Anzeigen vorhanden.',
    selectAllRows: 'Alle Zeilen auswählen',
    sortByColumn: 'Nach {column} sortieren',
    sortByColumnAsc: 'Nach {column} sortieren, aktuell aufsteigend',
    sortByColumnDesc: 'Nach {column} sortieren, aktuell absteigend',
    resizeColumn: 'Größe der Spalte {column} ändern',
    expandRow: 'Zeile {row} erweitern',
    collapseRow: 'Zeile {row} einklappen',
    selectRow: 'Zeile {row} auswählen',
    filterSelected: '{count} ausgewählt',
    filterKeywordActive: 'Stichwort aktiv',
    filterOptionsCount: '{count} Optionen',
    filterNoOptions: 'Keine Filteroptionen',
    filterEdit: 'Filter für {column} bearbeiten',
    filter: '{column} filtern',
    filterSearch: 'Filteroptionen für {column} durchsuchen',
    filterNoMatching: 'Keine passenden Optionen',
    filterClear: 'Löschen',
    filterSelect: '{label} auswählen',
    filterSearchPlaceholder: '{column} durchsuchen'
  },
  calendar: {
    prevPage: 'Vorherige Seite',
    nextPage: 'Nächste Seite',
    selectMonth: 'Monat auswählen',
    selectYear: 'Jahr auswählen'
  },
  datePicker: {
    toggle: 'Kalender öffnen',
    popupLabel: 'Datum auswählen'
  },
  dateRangePicker: {
    toggle: 'Kalender öffnen',
    popupLabel: 'Datumsbereich auswählen'
  },
  cascader: {
    clear: 'Leeren',
    noResults: 'Keine Daten',
    removeTag: '{label} entfernen',
    search: 'Suchen'
  },
  clipboard: {
    copy: 'Kopieren',
    copied: 'Kopiert'
  },
  layout: {
    toggleSidebar: 'Seitenleiste umschalten'
  },
  input: {
    clear: 'Eingabe löschen'
  },
  inputNumber: {
    increment: 'Erhöhen',
    decrement: 'Verringern',
    clear: 'Wert löschen'
  },
  textarea: {
    clear: 'Textbereich löschen'
  },
  tagsInput: {
    addTag: 'Tag hinzufügen',
    clear: 'Tags löschen'
  },
  treeMenu: {
    openActions: 'Aktionen für {label} öffnen'
  },
  progress: {
    loading: 'Laden'
  },
  anchor: {
    nav: 'Ankernavigation'
  },
  breadcrumb: {
    nav: 'Breadcrumb'
  },
  stepper: {
    step: 'Schritt {step}',
    ariaLabel: 'Schritt-für-Schritt-Fortschritt',
    stepOf: 'Schritt {current} von {total}'
  },
  editable: {
    cancel: 'Abbrechen',
    edit: 'Bearbeiten',
    submit: 'Speichern'
  },
  combobox: {
    clearInput: 'Eingabe löschen',
    noResults: 'Keine Ergebnisse gefunden.',
    search: 'Suchen',
    options: 'Optionen'
  },
  autocomplete: {
    toggleSuggestions: 'Vorschläge umschalten',
    clearInput: 'Eingabe löschen',
    noResults: 'Keine Ergebnisse gefunden.',
    options: 'Optionen'
  },
  command: {
    noResults: 'Keine Ergebnisse gefunden.'
  },
  dialog: {
    cancel: 'Abbrechen',
    confirm: 'Bestätigen'
  },
  rating: {
    ariaLabel: 'Bewertung',
    starN: '{count} von {max} Sternen',
    empty: 'Keine Bewertung'
  },
  slider: {
    valueN: 'Wert {index} von {total}',
    minimum: 'Minimum',
    maximum: 'Maximum'
  },
  password: {
    clearInput: 'Eingabe löschen',
    showPassword: 'Passwort anzeigen',
    hidePassword: 'Passwort ausblenden'
  },
  date: {
    daySegment: 'Tag,',
    monthSegment: 'Monat,',
    yearSegment: 'Jahr,',
    hourSegment: 'Stunde,',
    minuteSegment: 'Minute,',
    secondSegment: 'Sekunde,',
    dayPeriodSegment: 'AM/PM,',
    timeZoneSegment: 'Zeitzone,',
    empty: 'Leer',
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

const de: LocaleRegistry = {
  name: 'Deutsch',
  key: 'de',
  dir: 'ltr',
  messages
};

export default de;
