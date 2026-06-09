import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: 'Первая страница',
    prevPage: 'Предыдущая страница',
    nextPage: 'Следующая страница',
    lastPage: 'Последняя страница'
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
    selectRow: 'Выбрать строку {row}'
  },
  calendar: {
    prevPage: 'Предыдущая страница',
    nextPage: 'Следующая страница',
    selectMonth: 'Выбрать месяц',
    selectYear: 'Выбрать год'
  },
  layout: {
    toggleSidebar: 'Переключить боковую панель'
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
    step: 'Шаг {step}'
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
    noResults: 'Ничего не найдено.'
  },
  command: {
    noResults: 'Ничего не найдено.'
  },
  dialog: {
    cancel: 'Отмена',
    confirm: 'Подтвердить'
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
  }
};

const ru: LocaleRegistry = {
  name: 'Русский',
  key: 'ru',
  dir: 'ltr',
  messages
};

export default ru;
