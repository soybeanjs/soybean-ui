export const treeMenus = [
  {
    id: 1,
    label: '首页',
    value: '1',
    icon: 'lucide:monitor',
    hidden: false,
    menuType: 'menu',
    order: 1
  },
  {
    id: 2,
    label: '系统管理',
    value: '2',
    icon: 'lucide:monitor-cog',
    hidden: false,
    menuType: 'directory',
    order: 2,
    children: [
      {
        id: 3,
        parentId: 2,
        label: '路由管理',
        value: '3',
        icon: 'lucide:route',
        hidden: false,
        menuType: 'menu',
        order: 1
      },
      {
        id: 4,
        parentId: 2,
        label: '菜单管理',
        value: '4',
        icon: 'lucide:text-align-start',
        hidden: false,
        menuType: 'menu',
        order: 2
      },
      {
        id: 5,
        parentId: 2,
        label: '接口管理',
        value: '5',
        icon: 'lucide:chart-network',
        hidden: false,
        menuType: 'menu',
        order: 3
      },
      {
        id: 6,
        parentId: 2,
        label: '权限管理',
        value: '6',
        icon: 'lucide:shield-check',
        hidden: false,
        menuType: 'menu',
        order: 4
      },
      {
        id: 7,
        parentId: 2,
        label: '角色管理',
        value: '7',
        icon: 'lucide:person-standing',
        hidden: false,
        menuType: 'menu',
        order: 5
      },
      {
        id: 8,
        parentId: 2,
        label: '组织管理',
        value: '8',
        icon: 'lucide:users',
        hidden: false,
        menuType: 'menu',
        order: 6
      },
      {
        id: 9,
        parentId: 2,
        label: '用户管理',
        value: '9',
        icon: 'lucide:user',
        hidden: false,
        menuType: 'menu',
        order: 7,
        children: [
          {
            id: 18,
            parentId: 9,
            label: '用户详情',
            value: '18',
            icon: 'lucide:book-user',
            hidden: true,
            menuType: 'page'
          }
        ]
      },
      {
        id: 10,
        parentId: 2,
        label: '字典管理',
        value: '10',
        icon: 'lucide:book-open',
        hidden: false,
        menuType: 'menu',
        order: 8
      }
    ],
    isGroup: true
  },
  {
    id: 11,
    label: '文档',
    value: '11',
    icon: 'lucide:files',
    hidden: false,
    menuType: 'directory',
    order: 3,
    children: [
      {
        id: 12,
        parentId: 11,
        label: 'Vue文档',
        value: '12',
        icon: 'logos:vue',
        hidden: false,
        menuType: 'iframe'
      },
      {
        id: 13,
        parentId: 11,
        label: 'Vite文档',
        value: '13',
        icon: 'logos:vitejs',
        hidden: false,
        menuType: 'iframe'
      }
    ],
    isGroup: true
  },
  {
    id: 14,
    label: '多级菜单',
    value: '14',
    icon: 'lucide:text-align-start',
    hidden: false,
    menuType: 'directory',
    order: 4,
    children: [
      {
        id: 15,
        parentId: 14,
        label: '一级子目录',
        value: '15',
        icon: 'lucide:text-align-start',
        hidden: false,
        menuType: 'directory',
        children: [
          {
            id: 16,
            parentId: 15,
            label: '二级子菜单',
            value: '16',
            icon: 'lucide:text-align-start',
            hidden: false,
            menuType: 'menu',
            order: 1
          }
        ]
      }
    ],
    isGroup: true
  },
  {
    id: 17,
    label: 'Github',
    value: '17',
    icon: 'lucide:github',
    hidden: false,
    menuType: 'link',
    order: 5,
    href: 'https://github.com/soybeanjs'
  }
];
