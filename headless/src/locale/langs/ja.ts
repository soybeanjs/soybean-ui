import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: '最初のページ',
    prevPage: '前のページ',
    nextPage: '次のページ',
    lastPage: '最後のページ'
  },
  table: {
    emptyTitle: 'データなし',
    emptyDescription: '表示できるデータはありません。',
    selectAllRows: 'すべての行を選択',
    sortByColumn: '{column}で並べ替え',
    sortByColumnAsc: '{column}で並べ替え、現在昇順',
    sortByColumnDesc: '{column}で並べ替え、現在降順',
    resizeColumn: '{column}列の幅を変更',
    expandRow: '行 {row} を展開',
    collapseRow: '行 {row} を折りたたむ',
    selectRow: '行 {row} を選択'
  },
  calendar: {
    prevPage: '前のページ',
    nextPage: '次のページ',
    selectMonth: '月を選択',
    selectYear: '年を選択'
  },
  layout: {
    toggleSidebar: 'サイドバーの切り替え'
  },
  inputNumber: {
    increment: '増加',
    decrement: '減少',
    clear: '値をクリア'
  },
  textarea: {
    clear: 'テキストエリアをクリア'
  },
  tagsInput: {
    addTag: 'タグを追加',
    clear: 'タグをクリア'
  },
  progress: {
    loading: '読み込み中'
  },
  anchor: {
    nav: 'アンカーナビゲーション'
  },
  breadcrumb: {
    nav: 'パンくずリスト'
  },
  stepper: {
    step: 'ステップ {step}'
  },
  editable: {
    cancel: 'キャンセル',
    edit: '編集',
    submit: '保存'
  },
  combobox: {
    clearInput: '入力をクリア',
    noResults: '結果が見つかりません。',
    search: '検索',
    options: 'オプション'
  },
  autocomplete: {
    toggleSuggestions: '候補を切り替え',
    clearInput: '入力をクリア',
    noResults: '結果が見つかりません。'
  },
  command: {
    noResults: '結果が見つかりません。'
  },
  dialog: {
    cancel: 'キャンセル',
    confirm: '確認'
  },
  slider: {
    valueN: '{total} 個中 {index} 番目の値',
    minimum: '最小',
    maximum: '最大'
  },
  password: {
    clearInput: '入力をクリア',
    showPassword: 'パスワードを表示',
    hidePassword: 'パスワードを非表示'
  },
  date: {
    daySegment: '日,',
    monthSegment: '月,',
    yearSegment: '年,',
    hourSegment: '時,',
    minuteSegment: '分,',
    secondSegment: '秒,',
    dayPeriodSegment: '午前/午後,',
    timeZoneSegment: 'タイムゾーン,',
    empty: '空',
    placeholder: {
      year: '年',
      month: '月',
      day: '日',
      time: '––'
    }
  }
};

const ja: LocaleRegistry = {
  name: '日本語',
  key: 'ja',
  dir: 'ltr',
  messages
};

export default ja;
