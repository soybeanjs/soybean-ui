# Breadcrumb

## 示例

```playground
base
separator
link
item-dropdown
ellipsis-dropdown
```

## Breadcrumb API

### 属性

<DataTable preset="props" :data="[
  { name: 'items', type: 'Array<BreadcrumbOptionData>', default: '—', description: '面包屑展示的数据', required: true },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: '面包屑尺寸' },
  { name: 'ellipsis', type: 'true | [number, number] | null', default: 'null', description: '是否启用省略,true 表示超出4个时启用省略,[number, number] 表示启用省略的开始和结束位置' },
  { name: 'listProps', type: 'HTMLAttributes', default: '{}', description: '给面包屑列表添加属性' },
  { name: 'itemProps', type: 'HTMLAttributes', default: '{}', description: '给面包屑项添加属性' },
  { name: 'linkProps', type: 'HTMLAttributes', default: '{}', description: '给面包屑链接添加属性' },
  { name: 'pageProps', type: 'HTMLAttributes', default: '{}', description: '给面包屑文本添加属性' },
  { name: 'separatorProps', type: 'HTMLAttributes', default: '{}', description: '给面包屑分隔符添加属性' },
  { name: 'ellipsisProps', type: 'HTMLAttributes', default: '{}', description: '给面包屑省略号添加属性' },
  { name: 'ui', type: 'Ui', default: '{}', description: '给对应容器添加 class 类名' },
]"/>

### 事件

<DataTable preset="events" :data="[
  { name: 'click', parameters: '(e: BreadcrumbOptionData) => void', description: '面包屑项点击事件' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'ellipsis', parameters: 'ellipsisItems: BreadcrumbOptionData[]', description: '自定义面包屑省略号' },
  { name: 'ellipsis-icon', parameters: '-', description: '自定义面包屑省略号图标' },
  { name: 'separator', parameters: '-', description: '自定义面包屑分隔符' },
  { name: 'item-leading', parameters: 'item: BreadcrumbOptionData', description: '自定义面包屑项的前置内容' },
  { name: 'item-link', parameters: 'item: BreadcrumbOptionData', description: '自定义面包屑项的链接内容' },
  { name: 'item-label', parameters: 'item: BreadcrumbOptionData', description: '自定义面包屑项的文本内容' },
  { name: 'item-trailing', parameters: 'item: BreadcrumbOptionData', description: '自定义面包屑项的后置内容' },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'BreadcrumbOptionData',
    description: '面包屑项数据类型',
    fields: [
      { name: 'value', type: 'string', description: '面包屑项值' },
      { name: 'label', type: 'string', description: '面包屑项文本' },
      { name: 'link', type: 'string', description: '面包屑项链接' },
      { name: 'icon', type: 'string', description: '面包屑项图标' },
      { name: 'disabled', type: 'boolean', description: '面包屑项是否禁用' },
      { name: 'linkProps', type: 'BreadcrumbLinkProps', description: '面包屑项链接属性' },
    ],
  },
  {
    name: 'BreadcrumbLinkProps',
    description: '面包屑项链接属性类型',
    fields: [
      { name: 'to', type: 'string', description: '面包屑项链接目标' },
      { name: 'href', type: 'string', description: '面包屑项链接' },
      { name: 'disabled', type: 'boolean', description: '面包屑项链接是否禁用' },
      { name: 'inaciveClass', type: 'string', description: '面包屑项链接禁用时添加的 class' },
      { name: 'external', type: 'boolean', description: '面包屑项链接是否外部链接' },
      { name: 'target', type: `'_blank' \| '_parent' \| '_self' \| '_top' \| (string & {}) \| null`, description: '面包屑项链接目标' },
      { name: 'rel', type: `'noopener' \| 'noreferrer' \| 'nofollow' \| 'sponsored' \| 'ugc' \| (string & {}) \| null`, description: '面包屑项链接 rel 属性' },
      { name: 'noRel', type: 'boolean', description: '是否禁用 rel 属性' },
      { name: 'prefetchedClass', type: 'string', description: '面包屑项链接预加载时添加的 class' },
      { name: 'prefetch', type: 'boolean', description: '是否预加载链接' },
      { name: 'prefetchOn', type: `'visibility' \| 'interaction' \| {visibility?: boolean; interaction?: boolean;}`, description: '控制何时预加载链接。默认情况下，仅在可见时触发预加载' },
      { name: 'noPrefetch', type: 'boolean', description: '是否禁用预加载链接' },
      { name: 'trailingSlash', type: `'append' \| 'remove'`, description: '是否添加尾部斜杠' },
    ],
  },
  {
    name: 'Ui',
    description: 'Breadcrumb 组件的自定义 class 名',
    fields: [
      { name: 'root', type: 'string', description: '应用到根容器的 class 名' },
      { name: 'list', type: 'string', description: '应用到面包屑列表的 class 名' },
      { name: 'item', type: 'string', description: '应用到面包屑项的 class 名' },
      { name: 'link', type: 'string', description: '应用到面包屑链接的 class 名' },
      { name: 'page', type: 'string', description: '应用到面包屑文本的 class 名' },
      { name: 'separator', type: 'string', description: '应用到面包屑分隔符的 class 名' },
      { name: 'ellipsis', type: 'string', description: '应用到面包屑省略号的 class 名' },
    ],
  }
]"/>
