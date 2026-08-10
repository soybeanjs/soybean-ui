import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: 'Primera página',
    prevPage: 'Página anterior',
    nextPage: 'Página siguiente',
    lastPage: 'Última página',
    pageLabel: 'Página {value}'
  },
  pageTabs: {
    closeTab: 'Cerrar pestaña',
    pinTab: 'Fijar pestaña',
    unpinTab: 'Desfijar pestaña'
  },
  table: {
    emptyTitle: 'Sin datos',
    emptyDescription: 'No hay datos que mostrar.',
    selectAllRows: 'Seleccionar todas las filas',
    sortByColumn: 'Ordenar por {column}',
    sortByColumnAsc: 'Ordenar por {column}, actualmente en orden ascendente',
    sortByColumnDesc: 'Ordenar por {column}, actualmente en orden descendente',
    resizeColumn: 'Redimensionar la columna {column}',
    expandRow: 'Expandir fila {row}',
    collapseRow: 'Contraer fila {row}',
    selectRow: 'Seleccionar fila {row}',
    filterSelected: '{count} seleccionado(s)',
    filterKeywordActive: 'Palabra clave activa',
    filterOptionsCount: '{count} opciones',
    filterNoOptions: 'Sin opciones de filtro',
    filterEdit: 'Editar filtro de {column}',
    filter: 'Filtrar {column}',
    filterSearch: 'Buscar opciones de filtro de {column}',
    filterNoMatching: 'Sin opciones coincidentes',
    filterClear: 'Limpiar',
    filterSelect: 'Seleccionar {label}',
    filterSearchPlaceholder: 'Buscar {column}'
  },
  calendar: {
    prevPage: 'Página anterior',
    nextPage: 'Página siguiente',
    selectMonth: 'Seleccionar mes',
    selectYear: 'Seleccionar año'
  },
  datePicker: {
    toggle: 'Abrir calendario',
    popupLabel: 'Elegir fecha'
  },
  dateRangePicker: {
    toggle: 'Abrir calendario',
    popupLabel: 'Elegir rango de fechas'
  },
  cascader: {
    clear: 'Limpiar',
    noResults: 'Sin datos',
    removeTag: 'Eliminar {label}',
    search: 'Buscar'
  },
  clipboard: {
    copy: 'Copiar',
    copied: 'Copiado'
  },
  layout: {
    toggleSidebar: 'Alternar barra lateral'
  },
  input: {
    clear: 'Borrar entrada'
  },
  inputNumber: {
    increment: 'Aumentar',
    decrement: 'Disminuir',
    clear: 'Borrar valor'
  },
  textarea: {
    clear: 'Borrar área de texto'
  },
  tagsInput: {
    addTag: 'Añadir etiqueta',
    clear: 'Borrar etiquetas'
  },
  treeMenu: {
    openActions: 'Abrir acciones de {label}'
  },
  progress: {
    loading: 'Cargando'
  },
  anchor: {
    nav: 'Navegación por anclas'
  },
  breadcrumb: {
    nav: 'Ruta de navegación'
  },
  stepper: {
    step: 'Paso {step}',
    ariaLabel: 'Progreso por pasos',
    stepOf: 'Paso {current} de {total}'
  },
  editable: {
    cancel: 'Cancelar',
    edit: 'Editar',
    submit: 'Enviar'
  },
  combobox: {
    clearInput: 'Borrar entrada',
    noResults: 'No se han encontrado resultados.',
    search: 'Buscar',
    options: 'Opciones'
  },
  autocomplete: {
    toggleSuggestions: 'Alternar sugerencias',
    clearInput: 'Borrar entrada',
    noResults: 'No se han encontrado resultados.',
    options: 'Opciones'
  },
  command: {
    noResults: 'No se han encontrado resultados.'
  },
  dialog: {
    cancel: 'Cancelar',
    confirm: 'Confirmar'
  },
  rating: {
    ariaLabel: 'Calificación',
    starN: '{count} de {max} estrellas',
    empty: 'Sin calificación'
  },
  slider: {
    valueN: 'Valor {index} de {total}',
    minimum: 'Mínimo',
    maximum: 'Máximo'
  },
  password: {
    clearInput: 'Borrar entrada',
    showPassword: 'Mostrar contraseña',
    hidePassword: 'Ocultar contraseña'
  },
  date: {
    daySegment: 'día,',
    monthSegment: 'mes,',
    yearSegment: 'año,',
    hourSegment: 'hora,',
    minuteSegment: 'minuto,',
    secondSegment: 'segundo,',
    dayPeriodSegment: 'AM/PM,',
    timeZoneSegment: 'zona horaria,',
    empty: 'Vacío',
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

const es: LocaleRegistry = {
  name: 'Español',
  key: 'es',
  dir: 'ltr',
  messages
};

export default es;
