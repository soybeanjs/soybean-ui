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
    items: ['layout', 'aspectRatio', 'separator']
  },
  {
    value: 'navigation',
    i18n: 'sidebar.navigation',
    items: ['breadcrumb', 'navigationMenu', 'menu', 'command', 'tabs', 'pagination', 'tree', 'treeMenu']
  },
  {
    value: 'dataEntry',
    i18n: 'sidebar.data_entry',
    items: [
      'form',
      'label',
      'input',
      'numberInput',
      'password',
      'textarea',
      'checkbox',
      'radioGroup',
      'segment',
      'select',
      'switch'
    ]
  },
  {
    value: 'dataDisplay',
    i18n: 'sidebar.data_display',
    items: ['accordion', 'collapsible', 'card', 'list', 'avatar', 'badge', 'kbd', 'tag', 'virtualizer']
  },
  {
    value: 'feedback',
    i18n: 'sidebar.feedback',
    items: ['alert', 'toast']
  },
  {
    value: 'overlay',
    i18n: 'sidebar.overlay',
    items: ['dialog', 'alertDialog', 'drawer', 'popover', 'tooltip', 'dropdownMenu', 'contextMenu']
  },
  {
    value: 'utilities',
    i18n: 'sidebar.utilities',
    items: ['arrow', 'visuallyHidden']
  }
];
