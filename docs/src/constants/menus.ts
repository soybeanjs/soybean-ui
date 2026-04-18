export interface MenuData {
  value: string;
  i18n: string;
  items: string[];
}

export const menuData: MenuData[] = [
  {
    value: 'general',
    i18n: 'sidebar.general',
    items: ['configProvider', 'button', 'clipboard', 'icon', 'link', 'spinner']
  },
  {
    value: 'groupLayout',
    i18n: 'sidebar.layout',
    items: ['aspectRatio', 'layout', 'separator', 'splitter', 'toolbar']
  },
  {
    value: 'navigation',
    i18n: 'sidebar.navigation',
    items: [
      'anchor',
      'breadcrumb',
      'command',
      'contextMenu',
      'dropdownMenu',
      'menu',
      'menubar',
      'navigationMenu',
      'pageTabs',
      'pagination',
      'stepper',
      'tabs',
      'tree',
      'treeMenu'
    ]
  },
  {
    value: 'forms',
    i18n: 'sidebar.forms',
    items: [
      'autocomplete',
      'colorArea',
      'colorField',
      'colorPicker',
      'colorSlider',
      'colorSwatchPicker',
      'combobox',
      'editable',
      'form',
      'label',
      'input',
      'inputNumber',
      'inputOtp',
      'password',
      'textarea',
      'checkbox',
      'radioGroup',
      'segment',
      'select',
      'slider',
      'switch',
      'tagsInput',
      'toggle',
      'toggleGroup'
    ]
  },
  {
    value: 'dataDisplay',
    i18n: 'sidebar.data_display',
    items: [
      'accordion',
      'affix',
      'carousel',
      'colorSwatch',
      'collapsible',
      'card',
      'empty',
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
    items: ['dialog', 'alertDialog', 'bottomSheet', 'drawer', 'hoverCard', 'popover', 'tooltip', 'popconfirm']
  },
  {
    value: 'utilities',
    i18n: 'sidebar.utilities',
    items: ['arrow', 'visuallyHidden']
  }
];
