export interface MenuData {
  value: string;
  i18n: string;
  items: string[];
}

export const menuData: MenuData[] = [
  {
    value: 'general',
    i18n: 'sidebar.general',
    items: ['configProvider', 'button', 'icon', 'link']
  },
  {
    value: 'groupLayout',
    i18n: 'sidebar.layout',
    items: ['aspectRatio', 'layout', 'separator']
  },
  {
    value: 'navigation',
    i18n: 'sidebar.navigation',
    items: [
      'breadcrumb',
      'command',
      'contextMenu',
      'dropdownMenu',
      'menu',
      'navigationMenu',
      'pageTabs',
      'pagination',
      'tabs',
      'tree',
      'treeMenu'
    ]
  },
  {
    value: 'forms',
    i18n: 'sidebar.forms',
    items: [
      'colorArea',
      'colorField',
      'colorPicker',
      'colorSlider',
      'colorSwatchPicker',
      'editable',
      'form',
      'label',
      'input',
      'inputNumber',
      'password',
      'textarea',
      'checkbox',
      'radioGroup',
      'segment',
      'select',
      'slider',
      'switch',
      'toggle',
      'toggleGroup'
    ]
  },
  {
    value: 'dataDisplay',
    i18n: 'sidebar.data_display',
    items: [
      'accordion',
      'colorSwatch',
      'collapsible',
      'card',
      'list',
      'avatar',
      'badge',
      'kbd',
      'progress',
      'scrollArea',
      'skeleton',
      'tag',
      'table',
      'virtualizer'
    ]
  },
  {
    value: 'feedback',
    i18n: 'sidebar.feedback',
    items: ['alert', 'toast']
  },
  {
    value: 'overlay',
    i18n: 'sidebar.overlay',
    items: ['dialog', 'alertDialog', 'drawer', 'popover', 'tooltip', 'popconfirm']
  },
  {
    value: 'utilities',
    i18n: 'sidebar.utilities',
    items: ['arrow', 'visuallyHidden']
  }
];
