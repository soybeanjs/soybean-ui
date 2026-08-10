import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: 'Первая страница',
    prevPage: 'Предыдущая страница',
    nextPage: 'Следующая страница',
    lastPage: 'Последняя страница',
    pageLabel: 'Страница {value}'
  },
  pageTabs: {
    closeTab: 'Закрыть вкладку',
    pinTab: 'Закрепить вкладку',
    unpinTab: 'Открепить вкладку'
  },
  table: {
    emptyTitle: 'Нет данных',
    emptyDescription: 'Нет данных для отображения.',
    selectAllRows: 'Выбрать все строки',
    sortByColumn: 'Сортировать по {column}',
    sortByColumnAsc: 'Сортировать по {column}, сейчас по возрастанию',
    sortByColumnDesc: 'Сортировать по {column}, сейчас по убыванию',
    resizeColumn: 'Изменить ширину столбца {column}',
    expandRow: 'Развернуть строку {row}',
    collapseRow: 'Свернуть строку {row}',
    selectRow: 'Выбрать строку {row}',
    filterSelected: 'Выбрано: {count}',
    filterKeywordActive: 'Ключевое слово активно',
    filterOptionsCount: 'Вариантов: {count}',
    filterNoOptions: 'Нет вариантов фильтра',
    filterEdit: 'Изменить фильтр для «{column}»',
    filter: 'Фильтр «{column}»',
    filterSearch: 'Поиск вариантов фильтра для «{column}»',
    filterNoMatching: 'Нет подходящих вариантов',
    filterClear: 'Очистить',
    filterSelect: 'Выбрать {label}',
    filterSearchPlaceholder: 'Поиск «{column}»'
  },
  calendar: {
    prevPage: 'Предыдущая страница',
    nextPage: 'Следующая страница',
    selectMonth: 'Выбрать месяц',
    selectYear: 'Выбрать год'
  },
  datePicker: {
    toggle: 'Открыть календарь',
    popupLabel: 'Выбрать дату'
  },
  dateRangePicker: {
    toggle: 'Открыть календарь',
    popupLabel: 'Выбрать диапазон дат'
  },
  cascader: {
    clear: 'Очистить',
    noResults: 'Нет данных',
    removeTag: 'Удалить {label}',
    search: 'Поиск'
  },
  clipboard: {
    copy: 'Копировать',
    copied: 'Скопировано'
  },
  layout: {
    toggleSidebar: 'Переключить боковую панель'
  },
  input: {
    clear: 'Очистить ввод'
  },
  inputNumber: {
    increment: 'Увеличить',
    decrement: 'Уменьшить',
    clear: 'Очистить значение'
  },
  textarea: {
    clear: 'Очистить текстовое поле'
  },
  tagsInput: {
    addTag: 'Добавить тег',
    clear: 'Очистить теги'
  },
  treeMenu: {
    openActions: 'Открыть действия для «{label}»'
  },
  progress: {
    loading: 'Загрузка'
  },
  anchor: {
    nav: 'Якорная навигация'
  },
  breadcrumb: {
    nav: 'Хлебные крошки'
  },
  stepper: {
    step: 'Шаг {step}',
    ariaLabel: 'Пошаговый прогресс',
    stepOf: 'Шаг {current} из {total}'
  },
  editable: {
    cancel: 'Отмена',
    edit: 'Редактировать',
    submit: 'Сохранить'
  },
  combobox: {
    clearInput: 'Очистить ввод',
    noResults: 'Ничего не найдено.',
    search: 'Поиск',
    options: 'Опции'
  },
  autocomplete: {
    toggleSuggestions: 'Переключить подсказки',
    clearInput: 'Очистить ввод',
    noResults: 'Ничего не найдено.',
    options: 'Опции'
  },
  command: {
    noResults: 'Ничего не найдено.'
  },
  dialog: {
    cancel: 'Отмена',
    confirm: 'Подтвердить'
  },
  rating: {
    ariaLabel: 'Оценка',
    starN: '{count} из {max} звёзд',
    empty: 'Без оценки'
  },
  slider: {
    valueN: 'Значение {index} из {total}',
    minimum: 'Минимум',
    maximum: 'Максимум'
  },
  password: {
    clearInput: 'Очистить ввод',
    showPassword: 'Показать пароль',
    hidePassword: 'Скрыть пароль'
  },
  date: {
    daySegment: 'день,',
    monthSegment: 'месяц,',
    yearSegment: 'год,',
    hourSegment: 'час,',
    minuteSegment: 'минута,',
    secondSegment: 'секунда,',
    dayPeriodSegment: 'AM/PM,',
    timeZoneSegment: 'часовой пояс,',
    empty: 'Пусто',
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

const ru: LocaleRegistry = {
  name: 'Русский',
  key: 'ru',
  dir: 'ltr',
  messages
};

export default ru;
