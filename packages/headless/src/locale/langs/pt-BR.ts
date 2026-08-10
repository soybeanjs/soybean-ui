import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: 'Primeira página',
    prevPage: 'Página anterior',
    nextPage: 'Próxima página',
    lastPage: 'Última página',
    pageLabel: 'Página {value}'
  },
  pageTabs: {
    closeTab: 'Fechar aba',
    pinTab: 'Fixar aba',
    unpinTab: 'Desafixar aba'
  },
  table: {
    emptyTitle: 'Sem dados',
    emptyDescription: 'Não há dados para exibir.',
    selectAllRows: 'Selecionar todas as linhas',
    sortByColumn: 'Ordenar por {column}',
    sortByColumnAsc: 'Ordenar por {column}, atualmente em ordem crescente',
    sortByColumnDesc: 'Ordenar por {column}, atualmente em ordem decrescente',
    resizeColumn: 'Redimensionar a coluna {column}',
    expandRow: 'Expandir linha {row}',
    collapseRow: 'Recolher linha {row}',
    selectRow: 'Selecionar linha {row}',
    filterSelected: '{count} selecionado(s)',
    filterKeywordActive: 'Palavra-chave ativa',
    filterOptionsCount: '{count} opções',
    filterNoOptions: 'Nenhuma opção de filtro',
    filterEdit: 'Editar filtro de {column}',
    filter: 'Filtrar {column}',
    filterSearch: 'Pesquisar opções de filtro de {column}',
    filterNoMatching: 'Nenhuma opção correspondente',
    filterClear: 'Limpar',
    filterSelect: 'Selecionar {label}',
    filterSearchPlaceholder: 'Pesquisar {column}'
  },
  calendar: {
    prevPage: 'Página anterior',
    nextPage: 'Próxima página',
    selectMonth: 'Selecionar mês',
    selectYear: 'Selecionar ano'
  },
  datePicker: {
    toggle: 'Abrir calendário',
    popupLabel: 'Escolher data'
  },
  dateRangePicker: {
    toggle: 'Abrir calendário',
    popupLabel: 'Escolher intervalo de datas'
  },
  cascader: {
    clear: 'Limpar',
    noResults: 'Sem dados',
    removeTag: 'Remover {label}',
    search: 'Pesquisar'
  },
  clipboard: {
    copy: 'Copiar',
    copied: 'Copiado'
  },
  layout: {
    toggleSidebar: 'Alternar barra lateral'
  },
  input: {
    clear: 'Limpar entrada'
  },
  inputNumber: {
    increment: 'Aumentar',
    decrement: 'Diminuir',
    clear: 'Limpar valor'
  },
  textarea: {
    clear: 'Limpar área de texto'
  },
  tagsInput: {
    addTag: 'Adicionar tag',
    clear: 'Limpar tags'
  },
  treeMenu: {
    openActions: 'Abrir ações de {label}'
  },
  progress: {
    loading: 'Carregando'
  },
  anchor: {
    nav: 'Navegação por âncoras'
  },
  breadcrumb: {
    nav: 'Trilha de navegação'
  },
  stepper: {
    step: 'Etapa {step}',
    ariaLabel: 'Progresso por etapas',
    stepOf: 'Etapa {current} de {total}'
  },
  editable: {
    cancel: 'Cancelar',
    edit: 'Editar',
    submit: 'Salvar'
  },
  combobox: {
    clearInput: 'Limpar entrada',
    noResults: 'Nenhum resultado encontrado.',
    search: 'Pesquisar',
    options: 'Opções'
  },
  autocomplete: {
    toggleSuggestions: 'Alternar sugestões',
    clearInput: 'Limpar entrada',
    noResults: 'Nenhum resultado encontrado.',
    options: 'Opções'
  },
  command: {
    noResults: 'Nenhum resultado encontrado.'
  },
  dialog: {
    cancel: 'Cancelar',
    confirm: 'Confirmar'
  },
  rating: {
    ariaLabel: 'Avaliação',
    starN: '{count} de {max} estrelas',
    empty: 'Sem avaliação'
  },
  slider: {
    valueN: 'Valor {index} de {total}',
    minimum: 'Mínimo',
    maximum: 'Máximo'
  },
  password: {
    clearInput: 'Limpar entrada',
    showPassword: 'Mostrar senha',
    hidePassword: 'Ocultar senha'
  },
  date: {
    daySegment: 'dia,',
    monthSegment: 'mês,',
    yearSegment: 'ano,',
    hourSegment: 'hora,',
    minuteSegment: 'minuto,',
    secondSegment: 'segundo,',
    dayPeriodSegment: 'AM/PM,',
    timeZoneSegment: 'fuso horário,',
    empty: 'Vazio',
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

const ptBR: LocaleRegistry = {
  name: 'Português (Brasil)',
  key: 'pt-BR',
  dir: 'ltr',
  messages
};

export default ptBR;
