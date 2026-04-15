import type { TableColumn } from '@soybeanjs/ui';

export interface GroupedTableData {
  id: number;
  name: string;
  age: number;
  city: string;
  score: number;
}

export const groupedTableData: GroupedTableData[] = [
  { id: 1, name: 'Ada Lovelace', age: 36, city: 'London', score: 96 },
  { id: 2, name: 'Linus Torvalds', age: 28, city: 'Helsinki', score: 88 },
  { id: 3, name: 'Grace Hopper', age: 41, city: 'New York', score: 92 }
];

export const groupedColumns: TableColumn<GroupedTableData>[] = [
  {
    title: 'Profile',
    key: 'profile',
    children: [
      { title: 'Name', dataIndex: 'name' },
      { title: 'City', dataIndex: 'city' }
    ]
  },
  {
    title: 'Metrics',
    key: 'metrics',
    children: [
      { title: 'Age', dataIndex: 'age', align: 'center' },
      { title: 'Score', dataIndex: 'score', align: 'center' }
    ]
  }
];

export const sortableColumns: TableColumn<GroupedTableData>[] = [
  { title: 'Name', dataIndex: 'name', sorter: true },
  { title: 'Age', dataIndex: 'age', align: 'center', sorter: true },
  { title: 'Score', dataIndex: 'score', align: 'center', sorter: (prev, next) => prev.score - next.score }
];

export const filterableColumns: TableColumn<GroupedTableData>[] = [
  { title: 'Name', dataIndex: 'name', filter: { placeholder: 'Filter by name' } },
  { title: 'City', dataIndex: 'city', filter: true },
  { title: 'Score', dataIndex: 'score', align: 'center' }
];

export interface EmployeeTableData {
  id: number;
  employeeId: string;
  name: string;
  role: string;
  team: string;
  status: string;
  location: string;
  timezone: string;
  email: string;
  phone: string;
  projects: number;
  utilization: string;
  lastUpdated: string;
  score: number;
}

export const employeeTableData: EmployeeTableData[] = [
  {
    id: 1,
    employeeId: 'ENG-001',
    name: 'Ada Lovelace',
    role: 'Architect',
    team: 'Core Platform',
    status: 'Active',
    location: 'London',
    timezone: 'UTC+0',
    email: 'ada.lovelace@soybean.dev',
    phone: '+44 20 7946 001',
    projects: 4,
    utilization: '91%',
    lastUpdated: '2026-04-10',
    score: 96
  },
  {
    id: 2,
    employeeId: 'ENG-014',
    name: 'Linus Torvalds',
    role: 'Maintainer',
    team: 'Kernel Systems',
    status: 'Reviewing',
    location: 'Helsinki',
    timezone: 'UTC+2',
    email: 'linus.torvalds@soybean.dev',
    phone: '+358 9 1234 014',
    projects: 6,
    utilization: '84%',
    lastUpdated: '2026-04-12',
    score: 88
  },
  {
    id: 3,
    employeeId: 'ENG-021',
    name: 'Grace Hopper',
    role: 'Scientist',
    team: 'Developer Experience',
    status: 'Active',
    location: 'New York',
    timezone: 'UTC-4',
    email: 'grace.hopper@soybean.dev',
    phone: '+1 212 555 0021',
    projects: 5,
    utilization: '89%',
    lastUpdated: '2026-04-14',
    score: 92
  },
  {
    id: 4,
    employeeId: 'ENG-037',
    name: 'Margaret Hamilton',
    role: 'Tech Lead',
    team: 'Design Systems',
    status: 'Planning',
    location: 'Boston',
    timezone: 'UTC-4',
    email: 'margaret.hamilton@soybean.dev',
    phone: '+1 617 555 0037',
    projects: 3,
    utilization: '76%',
    lastUpdated: '2026-04-09',
    score: 94
  },
  {
    id: 5,
    employeeId: 'ENG-052',
    name: 'Katherine Johnson',
    role: 'Analyst',
    team: 'Data Intelligence',
    status: 'Active',
    location: 'Hampton',
    timezone: 'UTC-4',
    email: 'katherine.johnson@soybean.dev',
    phone: '+1 757 555 0052',
    projects: 7,
    utilization: '93%',
    lastUpdated: '2026-04-13',
    score: 98
  }
];

export const fixedColumns: TableColumn<EmployeeTableData>[] = [
  { title: 'Employee ID', dataIndex: 'employeeId', width: '140px', fixed: 'start' },
  { title: 'Name', dataIndex: 'name', width: '180px', fixed: 'start' },
  { title: 'Role', dataIndex: 'role', width: '180px' },
  { title: 'Team', dataIndex: 'team', width: '160px' },
  { title: 'Status', dataIndex: 'status', width: '140px', align: 'center' },
  { title: 'Location', dataIndex: 'location', width: '180px' },
  { title: 'Timezone', dataIndex: 'timezone', width: '140px' },
  { title: 'Email', dataIndex: 'email', width: '240px' },
  { title: 'Phone', dataIndex: 'phone', width: '160px' },
  { title: 'Projects', dataIndex: 'projects', width: '120px', align: 'center' },
  { title: 'Utilization', dataIndex: 'utilization', width: '140px', align: 'center' },
  { title: 'Last Updated', dataIndex: 'lastUpdated', width: '160px' },
  { title: 'Score', dataIndex: 'score', width: '120px', align: 'center', fixed: 'end' }
];

export const resizableColumns: TableColumn<EmployeeTableData>[] = [
  { title: 'Employee ID', dataIndex: 'employeeId', width: '140px', resizable: true },
  { title: 'Name', dataIndex: 'name', width: '180px', resizable: true },
  { title: 'Role', dataIndex: 'role', width: '180px', resizable: true },
  { title: 'Team', dataIndex: 'team', width: '160px', resizable: true },
  { title: 'Status', dataIndex: 'status', width: '140px', align: 'center', resizable: true },
  { title: 'Location', dataIndex: 'location', width: '180px', resizable: true },
  { title: 'Timezone', dataIndex: 'timezone', width: '140px', resizable: true },
  { title: 'Email', dataIndex: 'email', width: '240px', resizable: true },
  { title: 'Phone', dataIndex: 'phone', width: '160px', resizable: true },
  { title: 'Projects', dataIndex: 'projects', width: '120px', align: 'center', resizable: true },
  { title: 'Utilization', dataIndex: 'utilization', width: '140px', align: 'center', resizable: true },
  { title: 'Last Updated', dataIndex: 'lastUpdated', width: '160px', resizable: true },
  { title: 'Score', dataIndex: 'score', width: '120px', align: 'center', resizable: true }
];
