import type { LocaleMessages } from '../types';

const zhTW: LocaleMessages = {
  pagination: {
    firstPage: '第一頁',
    prevPage: '上一頁',
    nextPage: '下一頁',
    lastPage: '最後一頁'
  },
  table: {
    emptyTitle: '暫無資料',
    emptyDescription: '目前沒有可顯示的資料。',
    selectAllRows: '全選',
    sortByColumn: '依 {column} 排序',
    sortByColumnAsc: '依 {column} 排序，目前為升冪',
    sortByColumnDesc: '依 {column} 排序，目前為降冪',
    resizeColumn: '調整 {column} 欄寬',
    expandRow: '展開列 {row}',
    collapseRow: '收合列 {row}',
    selectRow: '選取列 {row}'
  },
  calendar: {
    prevPage: '上一頁',
    nextPage: '下一頁',
    selectMonth: '選擇月份',
    selectYear: '選擇年份'
  },
  layout: {
    toggleSidebar: '切換側邊欄'
  },
  inputNumber: {
    increment: '增加',
    decrement: '減少',
    clear: '清除數值'
  },
  textarea: {
    clear: '清除文字區域'
  },
  tagsInput: {
    addTag: '新增標籤',
    clear: '清除標籤'
  },
  progress: {
    loading: '載入中'
  },
  anchor: {
    nav: '錨點導覽'
  },
  breadcrumb: {
    nav: '麵包屑'
  },
  stepper: {
    step: '第 {step} 步'
  },
  editable: {
    cancel: '取消',
    edit: '編輯',
    submit: '提交'
  },
  combobox: {
    clearInput: '清除輸入',
    noResults: '無符合結果。',
    search: '搜尋',
    options: '選項'
  },
  autocomplete: {
    toggleSuggestions: '切換建議清單',
    clearInput: '清除輸入',
    noResults: '無符合結果。'
  },
  command: {
    noResults: '無符合結果。'
  },
  dialog: {
    cancel: '取消',
    confirm: '確認'
  },
  slider: {
    valueN: '第 {index} 個值，共 {total} 個',
    minimum: '最小值',
    maximum: '最大值'
  },
  password: {
    clearInput: '清除輸入',
    showPassword: '顯示密碼',
    hidePassword: '隱藏密碼'
  },
  date: {
    daySegment: '日,',
    monthSegment: '月,',
    yearSegment: '年,',
    hourSegment: '時,',
    minuteSegment: '分,',
    secondSegment: '秒,',
    dayPeriodSegment: '上午/下午,',
    timeZoneSegment: '時區,',
    empty: '空',
    placeholder: {
      year: '年',
      month: '月',
      day: '日',
      time: '––'
    }
  }
};

export default zhTW;
