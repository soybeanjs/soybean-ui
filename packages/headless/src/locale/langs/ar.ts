import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: 'الصفحة الأولى',
    prevPage: 'الصفحة السابقة',
    nextPage: 'الصفحة التالية',
    lastPage: 'الصفحة الأخيرة',
    pageLabel: 'صفحة {value}'
  },
  pageTabs: {
    closeTab: 'إغلاق التبويب',
    pinTab: 'تثبيت التبويب',
    unpinTab: 'إلغاء تثبيت التبويب'
  },
  table: {
    emptyTitle: 'لا توجد بيانات',
    emptyDescription: 'لا توجد بيانات لعرضها.',
    selectAllRows: 'تحديد جميع الصفوف',
    sortByColumn: 'فرز حسب {column}',
    sortByColumnAsc: 'فرز حسب {column}، تصاعديًا حاليًا',
    sortByColumnDesc: 'فرز حسب {column}، تنازليًا حاليًا',
    resizeColumn: 'تغيير عرض عمود {column}',
    expandRow: 'توسيع الصف {row}',
    collapseRow: 'طي الصف {row}',
    selectRow: 'تحديد الصف {row}',
    filterSelected: 'تم تحديد {count}',
    filterKeywordActive: 'الكلمة الأساسية نشطة',
    filterOptionsCount: '{count} خيارات',
    filterNoOptions: 'لا توجد خيارات تصفية',
    filterEdit: 'تعديل الفلتر لـ {column}',
    filter: 'تصفية {column}',
    filterSearch: 'البحث عن خيارات التصفية لـ {column}',
    filterNoMatching: 'لا توجد خيارات مطابقة',
    filterClear: 'مسح',
    filterSelect: 'تحديد {label}',
    filterSearchPlaceholder: 'البحث في {column}'
  },
  calendar: {
    prevPage: 'الصفحة السابقة',
    nextPage: 'الصفحة التالية',
    selectMonth: 'اختر الشهر',
    selectYear: 'اختر السنة'
  },
  datePicker: {
    toggle: 'فتح التقويم',
    popupLabel: 'اختر التاريخ'
  },
  dateRangePicker: {
    toggle: 'فتح التقويم',
    popupLabel: 'اختر نطاق التاريخ'
  },
  cascader: {
    clear: 'مسح',
    noResults: 'لا توجد بيانات',
    removeTag: 'إزالة {label}',
    search: 'بحث'
  },
  clipboard: {
    copy: 'نسخ',
    copied: 'تم النسخ'
  },
  layout: {
    toggleSidebar: 'تبديل الشريط الجانبي'
  },
  input: {
    clear: 'مسح الإدخال'
  },
  inputNumber: {
    increment: 'زيادة',
    decrement: 'إنقاص',
    clear: 'مسح القيمة'
  },
  textarea: {
    clear: 'مسح النص'
  },
  tagsInput: {
    addTag: 'إضافة وسم',
    clear: 'مسح الوسوم'
  },
  treeMenu: {
    openActions: 'فتح إجراءات {label}'
  },
  progress: {
    loading: 'جارٍ التحميل'
  },
  anchor: {
    nav: 'المرساة'
  },
  breadcrumb: {
    nav: 'مسار التنقل'
  },
  stepper: {
    step: 'الخطوة {step}',
    ariaLabel: 'التقدم خطوة بخطوة',
    stepOf: 'الخطوة {current} من {total}'
  },
  editable: {
    cancel: 'إلغاء',
    edit: 'تحرير',
    submit: 'إرسال'
  },
  combobox: {
    clearInput: 'مسح الإدخال',
    noResults: 'لم يتم العثور على نتائج.',
    search: 'بحث',
    options: 'الخيارات'
  },
  autocomplete: {
    toggleSuggestions: 'تبديل الاقتراحات',
    clearInput: 'مسح الإدخال',
    noResults: 'لم يتم العثور على نتائج.',
    options: 'الخيارات'
  },
  command: {
    noResults: 'لم يتم العثور على نتائج.'
  },
  dialog: {
    cancel: 'إلغاء',
    confirm: 'تأكيد'
  },
  rating: {
    ariaLabel: 'التقييم',
    starN: '{count} من {max} نجوم',
    empty: 'بدون تقييم'
  },
  slider: {
    valueN: 'القيمة {index} من {total}',
    minimum: 'الحد الأدنى',
    maximum: 'الحد الأقصى'
  },
  password: {
    clearInput: 'مسح الإدخال',
    showPassword: 'إظهار كلمة المرور',
    hidePassword: 'إخفاء كلمة المرور'
  },
  date: {
    daySegment: 'اليوم، ',
    monthSegment: 'الشهر، ',
    yearSegment: 'السنة، ',
    hourSegment: 'الساعة، ',
    minuteSegment: 'الدقيقة، ',
    secondSegment: 'الثانية، ',
    dayPeriodSegment: 'ص/م، ',
    timeZoneSegment: 'المنطقة الزمنية، ',
    empty: 'فارغ',
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

const ar: LocaleRegistry = {
  name: 'العربية',
  key: 'ar',
  dir: 'rtl',
  messages
};

export default ar;
