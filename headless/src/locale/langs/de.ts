import type { LocaleMessages } from '../types';

const de: LocaleMessages = {
  pagination: {
    firstPage: 'Erste Seite',
    prevPage: 'Vorherige Seite',
    nextPage: 'Nächste Seite',
    lastPage: 'Letzte Seite'
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
    selectRow: 'Zeile {row} auswählen'
  },
  calendar: {
    prevPage: 'Vorherige Seite',
    nextPage: 'Nächste Seite',
    selectMonth: 'Monat auswählen',
    selectYear: 'Jahr auswählen'
  },
  layout: {
    toggleSidebar: 'Seitenleiste umschalten'
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
    step: 'Schritt {step}'
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
    noResults: 'Keine Ergebnisse gefunden.'
  },
  command: {
    noResults: 'Keine Ergebnisse gefunden.'
  },
  dialog: {
    cancel: 'Abbrechen',
    confirm: 'Bestätigen'
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
  }
};

export default de;
