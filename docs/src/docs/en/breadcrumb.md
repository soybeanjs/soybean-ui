# Breadcrumb

## Demos

```playground
base
separator
link
item-dropdown
ellipsis-dropdown
```

## Breadcrumb API

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'Array<BreadcrumbOptionData>', default: '—', description: 'data of breadcrumb items', required: true },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'breadcrumb size' },
  { name: 'ellipsis', type: 'true | [number, number] | null', default: 'null', description: 'whether to enable ellipsis, true means to enable ellipsis when more than 4 items, [number, number] means to enable ellipsis at the start and end positions' },
  { name: 'listProps', type: 'HTMLAttributes', default: '{}', description: 'add attributes to breadcrumb list' },
  { name: 'itemProps', type: 'HTMLAttributes', default: '{}', description: 'add attributes to breadcrumb item' },
  { name: 'linkProps', type: 'HTMLAttributes', default: '{}', description: 'add attributes to breadcrumb link' },
  { name: 'pageProps', type: 'HTMLAttributes', default: '{}', description: 'add attributes to breadcrumb text' },
  { name: 'separatorProps', type: 'HTMLAttributes', default: '{}', description: 'add attributes to breadcrumb separator' },
  { name: 'ellipsisProps', type: 'HTMLAttributes', default: '{}', description: 'add attributes to breadcrumb ellipsis' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'add class name to the corresponding container' },
]"/>

### Events

<DataTable preset="events" :data="[
  { name: 'click', parameters: '(e: BreadcrumbOptionData) => void', description: 'breadcrumb item click event' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'ellipsis', parameters: 'ellipsisItems: BreadcrumbOptionData[]', description: 'custom breadcrumb ellipsis' },
  { name: 'ellipsis-icon', parameters: '-', description: 'custom breadcrumb ellipsis icon' },
  { name: 'separator', parameters: '-', description: 'custom breadcrumb separator' },
  { name: 'item-leading', parameters: 'item: BreadcrumbOptionData', description: 'custom breadcrumb item leading content' },
  { name: 'item-link', parameters: 'item: BreadcrumbOptionData', description: 'custom breadcrumb item link content' },
  { name: 'item-label', parameters: 'item: BreadcrumbOptionData', description: 'custom breadcrumb item label content' },
  { name: 'item-trailing', parameters: 'item: BreadcrumbOptionData', description: 'custom breadcrumb item trailing content' },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'BreadcrumbOptionData',
    description: 'breadcrumb item data type',
    fields: [
      { name: 'value', type: 'string', description: 'breadcrumb item value' },
      { name: 'label', type: 'string', description: 'breadcrumb item label' },
      { name: 'link', type: 'string', description: 'breadcrumb item link' },
      { name: 'icon', type: 'string', description: 'breadcrumb item icon' },
      { name: 'disabled', type: 'boolean', description: 'whether the breadcrumb item is disabled' },
      { name: 'linkProps', type: 'BreadcrumbLinkProps', description: 'breadcrumb item link props' },
    ],
  },
  {
    name: 'BreadcrumbLinkProps',
    description: 'breadcrumb item link props type',
    fields: [
      { name: 'to', type: 'string', description: 'breadcrumb item link target' },
      { name: 'href', type: 'string', description: 'breadcrumb item link' },
      { name: 'disabled', type: 'boolean', description: 'whether the breadcrumb item link is disabled' },
      { name: 'inaciveClass', type: 'string', description: 'class added to the breadcrumb item link when it is disabled' },
      { name: 'external', type: 'boolean', description: 'whether the breadcrumb item link is external' },
      { name: 'target', type: `'_blank' \| '_parent' \| '_self' \| '_top' \| (string & {}) \| null`, description: 'breadcrumb item link target' },
      { name: 'rel', type: `'noopener' \| 'noreferrer' \| 'nofollow' \| 'sponsored' \| 'ugc' \| (string & {}) \| null`, description: 'breadcrumb item link rel attribute' },
      { name: 'noRel', type: 'boolean', description: 'whether to disable the rel attribute' },
      { name: 'prefetchedClass', type: 'string', description: 'class added to the breadcrumb item link when it is prefetched' },
      { name: 'prefetch', type: 'boolean', description: 'whether to prefetch the link' },
      { name: 'prefetchOn', type: `'visibility' \| 'interaction' \| {visibility?: boolean; interaction?: boolean;}`, description: 'control when to prefetch the link. by default, prefetch is triggered only on visibility' },
      { name: 'noPrefetch', type: 'boolean', description: 'whether to disable the prefetch' },
      { name: 'trailingSlash', type: `'append' \| 'remove'`, description: 'whether to add a trailing slash' },
    ],
  },
  {
    name: 'Ui',
    description: 'custom class name for Breadcrumb component',
    fields: [
      { name: 'root', type: 'string', description: 'class name applied to the root container' },
      { name: 'list', type: 'string', description: 'class name applied to the breadcrumb list' },
      { name: 'item', type: 'string', description: 'class name applied to the breadcrumb item' },
      { name: 'link', type: 'string', description: 'class name applied to the breadcrumb link' },
      { name: 'page', type: 'string', description: 'class name applied to the breadcrumb text' },
      { name: 'separator', type: 'string', description: 'class name applied to the breadcrumb separator' },
      { name: 'ellipsis', type: 'string', description: 'class name applied to the breadcrumb ellipsis' },
    ],
  }
]"/>
