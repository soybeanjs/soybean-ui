import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: 'Halaman pertama',
    prevPage: 'Halaman sebelumnya',
    nextPage: 'Halaman berikutnya',
    lastPage: 'Halaman terakhir',
    pageLabel: 'Halaman {value}'
  },
  pageTabs: {
    closeTab: 'Tutup tab',
    pinTab: 'Sematkan tab',
    unpinTab: 'Lepas sematan tab'
  },
  table: {
    emptyTitle: 'Tidak ada data',
    emptyDescription: 'Tidak ada data yang dapat ditampilkan.',
    selectAllRows: 'Pilih semua baris',
    sortByColumn: 'Urutkan berdasarkan {column}',
    sortByColumnAsc: 'Urutkan berdasarkan {column}, saat ini menaik',
    sortByColumnDesc: 'Urutkan berdasarkan {column}, saat ini menurun',
    resizeColumn: 'Ubah ukuran kolom {column}',
    expandRow: 'Buka baris {row}',
    collapseRow: 'Tutup baris {row}',
    selectRow: 'Pilih baris {row}',
    filterSelected: '{count} dipilih',
    filterKeywordActive: 'Kata kunci aktif',
    filterOptionsCount: '{count} opsi',
    filterNoOptions: 'Tidak ada opsi filter',
    filterEdit: 'Edit filter untuk {column}',
    filter: 'Filter {column}',
    filterSearch: 'Cari opsi filter untuk {column}',
    filterNoMatching: 'Tidak ada opsi yang cocok',
    filterClear: 'Bersihkan',
    filterSelect: 'Pilih {label}',
    filterSearchPlaceholder: 'Cari {column}'
  },
  calendar: {
    prevPage: 'Halaman sebelumnya',
    nextPage: 'Halaman berikutnya',
    selectMonth: 'Pilih bulan',
    selectYear: 'Pilih tahun'
  },
  datePicker: {
    toggle: 'Buka kalender',
    popupLabel: 'Pilih tanggal'
  },
  dateRangePicker: {
    toggle: 'Buka kalender',
    popupLabel: 'Pilih rentang tanggal'
  },
  cascader: {
    clear: 'Hapus',
    noResults: 'Tidak ada data',
    removeTag: 'Hapus {label}',
    search: 'Cari'
  },
  clipboard: {
    copy: 'Salin',
    copied: 'Disalin'
  },
  layout: {
    toggleSidebar: 'Alihkan bilah sisi'
  },
  input: {
    clear: 'Hapus input'
  },
  inputNumber: {
    increment: 'Naikkan',
    decrement: 'Turunkan',
    clear: 'Hapus nilai'
  },
  textarea: {
    clear: 'Hapus area teks'
  },
  tagsInput: {
    addTag: 'Tambahkan tag',
    clear: 'Hapus tag'
  },
  treeMenu: {
    openActions: 'Buka tindakan {label}'
  },
  progress: {
    loading: 'Memuat'
  },
  anchor: {
    nav: 'Navigasi jangkar'
  },
  breadcrumb: {
    nav: 'Breadcrumb'
  },
  stepper: {
    step: 'Langkah {step}',
    ariaLabel: 'Progres langkah',
    stepOf: 'Langkah {current} dari {total}'
  },
  editable: {
    cancel: 'Batal',
    edit: 'Edit',
    submit: 'Simpan'
  },
  combobox: {
    clearInput: 'Hapus input',
    noResults: 'Tidak ada hasil.',
    search: 'Cari',
    options: 'Opsi'
  },
  autocomplete: {
    toggleSuggestions: 'Alihkan saran',
    clearInput: 'Hapus input',
    noResults: 'Tidak ada hasil.',
    options: 'Opsi'
  },
  command: {
    noResults: 'Tidak ada hasil.'
  },
  dialog: {
    cancel: 'Batal',
    confirm: 'Konfirmasi'
  },
  rating: {
    ariaLabel: 'Rating',
    starN: '{count} dari {max} bintang',
    empty: 'Belum dinilai'
  },
  slider: {
    valueN: 'Nilai {index} dari {total}',
    minimum: 'Minimum',
    maximum: 'Maksimum'
  },
  password: {
    clearInput: 'Hapus input',
    showPassword: 'Tampilkan kata sandi',
    hidePassword: 'Sembunyikan kata sandi'
  },
  date: {
    daySegment: 'hari,',
    monthSegment: 'bulan,',
    yearSegment: 'tahun,',
    hourSegment: 'jam,',
    minuteSegment: 'menit,',
    secondSegment: 'detik,',
    dayPeriodSegment: 'AM/PM,',
    timeZoneSegment: 'zona waktu,',
    empty: 'Kosong',
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

const id: LocaleRegistry = {
  name: 'Bahasa Indonesia',
  key: 'id',
  dir: 'ltr',
  messages
};

export default id;
