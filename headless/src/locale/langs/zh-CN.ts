import type { LocaleMessages } from '../types';

export const zhCN: LocaleMessages = {
  pagination: {
    firstPage: '第一页',
    prevPage: '上一页',
    nextPage: '下一页',
    lastPage: '最后一页'
  },
  table: {
    emptyTitle: '暂无数据',
    emptyDescription: '当前没有可显示的数据。',
    selectAllRows: '全选',
    sortByColumn: '按{column}排序',
    sortByColumnAsc: '按{column}排序，当前升序',
    sortByColumnDesc: '按{column}排序，当前降序',
    resizeColumn: '调整{column}列宽',
    expandRow: '展开行 {row}',
    collapseRow: '收起行 {row}',
    selectRow: '选择行 {row}'
  },
  calendar: {
    prevPage: '上一页',
    nextPage: '下一页'
  },
  layout: {
    toggleSidebar: '切换侧边栏'
  },
  inputNumber: {
    increment: '增加',
    decrement: '减少',
    clear: '清除数值'
  },
  progress: {
    loading: '加载中'
  },
  anchor: {
    nav: '锚点导航'
  },
  breadcrumb: {
    nav: '面包屑'
  },
  stepper: {
    step: '第 {step} 步'
  },
  editable: {
    cancel: '取消',
    edit: '编辑',
    submit: '提交'
  },
  combobox: {
    clearInput: '清除输入',
    noResults: '无匹配结果。',
    search: '搜索',
    options: '选项'
  },
  autocomplete: {
    toggleSuggestions: '切换建议列表',
    clearInput: '清除输入',
    noResults: '无匹配结果。'
  },
  command: {
    noResults: '无匹配结果。'
  },
  slider: {
    valueN: '第 {index} 个值，共 {total} 个',
    minimum: '最小值',
    maximum: '最大值'
  },
  password: {
    clearInput: '清除输入',
    showPassword: '显示密码',
    hidePassword: '隐藏密码'
  },
  date: {
    daySegment: '日,',
    monthSegment: '月, ',
    yearSegment: '年, ',
    hourSegment: '时, ',
    minuteSegment: '分, ',
    secondSegment: '秒, ',
    dayPeriodSegment: '上午/下午, ',
    timeZoneSegment: '时区, ',
    empty: '空',
    placeholder: {
      year: '年',
      month: '月',
      day: '日',
      time: '––'
    }
  }
};
