import type { LocaleMessages, LocaleRegistry } from '../types';

const messages: LocaleMessages = {
  pagination: {
    firstPage: '第一页',
    prevPage: '上一页',
    nextPage: '下一页',
    lastPage: '最后一页',
    pageLabel: '第 {value} 页'
  },
  pageTabs: {
    closeTab: '关闭标签页',
    pinTab: '固定标签页',
    unpinTab: '取消固定标签页'
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
    selectRow: '选择行 {row}',
    filterSelected: '已选 {count} 项',
    filterKeywordActive: '关键字筛选生效',
    filterOptionsCount: '{count} 个选项',
    filterNoOptions: '无筛选项',
    filterEdit: '编辑「{column}」筛选',
    filter: '筛选「{column}」',
    filterSearch: '搜索「{column}」的筛选选项',
    filterNoMatching: '无匹配选项',
    filterClear: '清除',
    filterSelect: '选择 {label}',
    filterSearchPlaceholder: '搜索 {column}'
  },
  calendar: {
    prevPage: '上一页',
    nextPage: '下一页',
    selectMonth: '选择月份',
    selectYear: '选择年份'
  },
  datePicker: {
    toggle: '打开日历',
    popupLabel: '选择日期'
  },
  dateRangePicker: {
    toggle: '打开日历',
    popupLabel: '选择日期范围'
  },
  cascader: {
    clear: '清除',
    noResults: '暂无数据',
    removeTag: '移除 {label}',
    search: '搜索'
  },
  clipboard: {
    copy: '复制',
    copied: '已复制'
  },
  layout: {
    toggleSidebar: '切换侧边栏'
  },
  input: {
    clear: '清除输入'
  },
  inputNumber: {
    increment: '增加',
    decrement: '减少',
    clear: '清除数值'
  },
  textarea: {
    clear: '清除文本域'
  },
  tagsInput: {
    addTag: '添加标签',
    clear: '清除标签'
  },
  treeMenu: {
    openActions: '打开 {label} 的操作'
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
    step: '第 {step} 步',
    ariaLabel: '分步进度',
    stepOf: '第 {current} 步，共 {total} 步'
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
    noResults: '无匹配结果。',
    options: '选项'
  },
  command: {
    noResults: '无匹配结果。'
  },
  dialog: {
    cancel: '取消',
    confirm: '确认'
  },
  rating: {
    ariaLabel: '评分',
    starN: '{count}/{max} 星',
    empty: '未评分'
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
  },
  themeCustomizer: {
    sections: {
      mode: '模式',
      palette: '调色板',
      base: '基础色',
      primary: '主色',
      radius: '圆角',
      size: '尺寸',
      scheme: '配色方案',
      feedback: '反馈',
      chart: '图表',
      sidebar: '侧边栏',
      advanced: '高级',
      theme: '主题',
      custom: '自定义',
      menu: '菜单',
      levels: '层级',
      lightLevel: '浅色层级',
      darkLevel: '深色层级',
      menuColor: '菜单颜色',
      menuAccent: '菜单强调色',
      savePresetPlaceholder: '请输入预设名称',
      save: '保存',
      cssVars: 'CSS变量主题',
      reset: '重置'
    },
    groups: {
      surfaces: '表面',
      palette: '调色板',
      hairlines: '描边',
      sidebar: '侧边栏',
      charts: '图表',
      feedback: '反馈'
    },
    variants: {
      background: '背景',
      foreground: '前景',
      card: '卡片',
      cardForeground: '卡片前景',
      popover: '浮层',
      popoverForeground: '浮层前景',
      primary: '主色',
      primaryForeground: '主色前景',
      ring: '焦点环',
      secondary: '次要',
      secondaryForeground: '次要前景',
      muted: '弱化',
      mutedForeground: '弱化前景',
      accent: '强调',
      accentForeground: '强调前景',
      border: '边框',
      input: '输入框',
      sidebar: '侧边栏',
      sidebarForeground: '侧边栏前景',
      sidebarPrimary: '侧边栏主色',
      sidebarPrimaryForeground: '侧边栏主色前景',
      sidebarAccent: '侧边栏强调',
      sidebarAccentForeground: '侧边栏强调前景',
      sidebarBorder: '侧边栏边框',
      sidebarRing: '侧边栏焦点环',
      chart1: '图表 1',
      chart2: '图表 2',
      chart3: '图表 3',
      chart4: '图表 4',
      chart5: '图表 5',
      destructive: '危险',
      destructiveForeground: '危险前景',
      success: '成功',
      successForeground: '成功前景',
      warning: '警告',
      warningForeground: '警告前景',
      info: '信息',
      infoForeground: '信息前景',
      carbon: '炭黑',
      carbonForeground: '炭黑前景'
    },
    options: {
      mode: {
        auto: '自动',
        light: '浅色',
        dark: '深色'
      },
      level: {
        lightness: '亮度',
        darkness: '暗度'
      },
      size: {
        xs: '特小',
        sm: '小',
        md: '中',
        lg: '大',
        xl: '特大',
        xl2: '超大'
      },
      palette: {
        slate: '石板灰',
        mist: '雾灰',
        gray: '灰',
        zinc: '锌',
        neutral: '中性',
        stone: '石色',
        taupe: '灰褐',
        olive: '橄榄',
        mauve: '紫红',
        red: '红',
        orange: '橙',
        amber: '琥珀',
        yellow: '黄',
        lime: '青柠',
        green: '绿',
        emerald: '翠绿',
        teal: '青',
        cyan: '青蓝',
        sky: '天蓝',
        blue: '蓝',
        indigo: '靛蓝',
        violet: '紫罗兰',
        purple: '紫',
        fuchsia: '品红',
        pink: '粉',
        rose: '玫红'
      },
      feedback: {
        classic: '经典',
        vivid: '鲜明',
        subtle: '柔和',
        modern: '现代',
        professional: '专业'
      },
      chart: {
        vivid: '鲜明',
        cool: '冷色',
        warm: '暖色',
        natural: '自然',
        minimal: '极简'
      },
      sidebar: {
        derived: '派生',
        invertedDark: '反转深色',
        soft: '柔和',
        contrast: '高对比'
      },
      menuColor: {
        default: '默认',
        inverted: '反转',
        defaultTranslucent: '默认半透明',
        invertedTranslucent: '反转半透明'
      },
      menuAccent: {
        subtle: '柔和',
        bold: '粗体'
      }
    }
  }
};

const zhCN: LocaleRegistry = {
  name: '简体中文',
  key: 'zh-CN',
  dir: 'ltr',
  messages
};

export default zhCN;
