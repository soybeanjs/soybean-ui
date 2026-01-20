export interface MenuData {
  label: string;
  items: string[];
}

export const menuData: MenuData[] = [
  {
    label: 'general',
    items: ['configProvider', 'button', 'icon', 'link']
  },
  {
    label: 'layout',
    items: ['layout', 'aspectRatio', 'separator']
  },
  {
    label: 'navigation',
    items: ['breadcrumb', 'navigationMenu', 'menu', 'command', 'tabs', 'pagination', 'tree', 'treeMenu']
  },
  {
    label: 'dataEntry',
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
    label: 'dataDisplay',
    items: ['accordion', 'collapsible', 'card', 'list', 'avatar', 'badge', 'kbd', 'tag', 'virtualizer']
  },
  {
    label: 'feedback',
    items: ['alert', 'toast']
  },
  {
    label: 'overlay',
    items: ['dialog', 'alertDialog', 'drawer', 'popover', 'tooltip', 'dropdownMenu', 'contextMenu']
  },
  {
    label: 'utilities',
    items: ['arrow', 'visuallyHidden']
  }
];
