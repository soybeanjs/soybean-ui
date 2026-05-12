import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: 'Primeira página',
    prevPage: 'Página anterior',
    nextPage: 'Próxima página',
    lastPage: 'Última página'
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
    selectRow: 'Selecionar linha {row}'
  },
  calendar: {
    prevPage: 'Página anterior',
    nextPage: 'Próxima página',
    selectMonth: 'Selecionar mês',
    selectYear: 'Selecionar ano'
  },
  layout: {
    toggleSidebar: 'Alternar barra lateral'
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
    step: 'Etapa {step}'
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
    noResults: 'Nenhum resultado encontrado.'
  },
  command: {
    noResults: 'Nenhum resultado encontrado.'
  },
  dialog: {
    cancel: 'Cancelar',
    confirm: 'Confirmar'
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
  }
};

const ptBR: LocaleRegistry = {
  name: 'Português (Brasil)',
  key: 'pt-BR',
  dir: 'ltr',
  messages
};

export default ptBR;
