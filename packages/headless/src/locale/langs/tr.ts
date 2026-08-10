import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: 'İlk sayfa',
    prevPage: 'Önceki sayfa',
    nextPage: 'Sonraki sayfa',
    lastPage: 'Son sayfa',
    pageLabel: 'Sayfa {value}'
  },
  pageTabs: {
    closeTab: 'Sekmeyi kapat',
    pinTab: 'Sekmeyi sabitle',
    unpinTab: 'Sekmeyi sabitlemeyi kaldır'
  },
  table: {
    emptyTitle: 'Veri yok',
    emptyDescription: 'Gösterilecek veri yok.',
    selectAllRows: 'Tüm satırları seç',
    sortByColumn: '{column} sütununa göre sırala',
    sortByColumnAsc: '{column} sütununa göre sırala, şu anda artan',
    sortByColumnDesc: '{column} sütununa göre sırala, şu anda azalan',
    resizeColumn: '{column} sütununu yeniden boyutlandır',
    expandRow: '{row} satırını genişlet',
    collapseRow: '{row} satırını daralt',
    selectRow: '{row} satırını seç',
    filterSelected: '{count} seçildi',
    filterKeywordActive: 'Anahtar kelime aktif',
    filterOptionsCount: '{count} seçenek',
    filterNoOptions: 'Filtre seçeneği yok',
    filterEdit: '{column} için filtreyi düzenle',
    filter: '{column} filtresi',
    filterSearch: '{column} için filtre seçeneklerini ara',
    filterNoMatching: 'Eşleşen seçenek yok',
    filterClear: 'Temizle',
    filterSelect: '{label} seç',
    filterSearchPlaceholder: '{column} ara'
  },
  calendar: {
    prevPage: 'Önceki sayfa',
    nextPage: 'Sonraki sayfa',
    selectMonth: 'Ay seç',
    selectYear: 'Yıl seç'
  },
  datePicker: {
    toggle: 'Takvimi aç',
    popupLabel: 'Tarih seç'
  },
  dateRangePicker: {
    toggle: 'Takvimi aç',
    popupLabel: 'Tarih aralığı seç'
  },
  cascader: {
    clear: 'Temizle',
    noResults: 'Veri yok',
    removeTag: '{label} kaldır',
    search: 'Ara'
  },
  clipboard: {
    copy: 'Kopyala',
    copied: 'Kopyalandı'
  },
  layout: {
    toggleSidebar: 'Yan çubuğu aç veya kapat'
  },
  input: {
    clear: 'Girdiyi temizle'
  },
  inputNumber: {
    increment: 'Artır',
    decrement: 'Azalt',
    clear: 'Değeri temizle'
  },
  textarea: {
    clear: 'Metin alanını temizle'
  },
  tagsInput: {
    addTag: 'Etiket ekle',
    clear: 'Etiketleri temizle'
  },
  treeMenu: {
    openActions: '{label} işlemlerini aç'
  },
  progress: {
    loading: 'Yükleniyor'
  },
  anchor: {
    nav: 'Çapa gezinmesi'
  },
  breadcrumb: {
    nav: 'Gezinti yolu'
  },
  stepper: {
    step: 'Adım {step}',
    ariaLabel: 'Adım adım ilerleme',
    stepOf: 'Adım {current} / {total}'
  },
  editable: {
    cancel: 'İptal',
    edit: 'Düzenle',
    submit: 'Kaydet'
  },
  combobox: {
    clearInput: 'Girdiyi temizle',
    noResults: 'Sonuç bulunamadı.',
    search: 'Ara',
    options: 'Seçenekler'
  },
  autocomplete: {
    toggleSuggestions: 'Önerileri aç veya kapat',
    clearInput: 'Girdiyi temizle',
    noResults: 'Sonuç bulunamadı.',
    options: 'Seçenekler'
  },
  command: {
    noResults: 'Sonuç bulunamadı.'
  },
  dialog: {
    cancel: 'İptal',
    confirm: 'Onayla'
  },
  rating: {
    ariaLabel: 'Derecelendirme',
    starN: '{max} yıldızdan {count}',
    empty: 'Derecelendirme yok'
  },
  slider: {
    valueN: '{total} değerden {index}. değer',
    minimum: 'Minimum',
    maximum: 'Maksimum'
  },
  password: {
    clearInput: 'Girdiyi temizle',
    showPassword: 'Parolayı göster',
    hidePassword: 'Parolayı gizle'
  },
  date: {
    daySegment: 'gün,',
    monthSegment: 'ay,',
    yearSegment: 'yıl,',
    hourSegment: 'saat,',
    minuteSegment: 'dakika,',
    secondSegment: 'saniye,',
    dayPeriodSegment: 'ÖÖ/ÖS,',
    timeZoneSegment: 'saat dilimi,',
    empty: 'Boş',
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

const tr: LocaleRegistry = {
  name: 'Türkçe',
  key: 'tr',
  dir: 'ltr',
  messages
};

export default tr;
