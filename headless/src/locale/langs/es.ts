import type { LocaleMessages } from '../types';

const es: LocaleMessages = {
  pagination: {
    firstPage: 'Primera página',
    prevPage: 'Página anterior',
    nextPage: 'Página siguiente',
    lastPage: 'Última página'
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
    selectRow: 'Seleccionar fila {row}'
  },
  calendar: {
    prevPage: 'Página anterior',
    nextPage: 'Página siguiente',
    selectMonth: 'Seleccionar mes',
    selectYear: 'Seleccionar año'
  },
  layout: {
    toggleSidebar: 'Alternar barra lateral'
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
    step: 'Paso {step}'
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
    noResults: 'No se han encontrado resultados.'
  },
  command: {
    noResults: 'No se han encontrado resultados.'
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
  }
};

export default es;
