<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';

interface TableData {
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

const columns: TableColumn<TableData>[] = [
  { title: 'Employee ID', dataIndex: 'employeeId', width: '140px', fixed: 'left', resizable: true },
  { title: 'Name', dataIndex: 'name', width: '180px', fixed: 'left', resizable: true },
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
  { title: 'Score', dataIndex: 'score', width: '120px', align: 'center', fixed: 'right', resizable: true }
];

const data: TableData[] = [
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
</script>

<template>
  <div>
    <h3 class="playground-title">Fixed Columns and Resizing</h3>
    <p class="mb-3 text-sm text-muted-foreground">
      Two columns stay pinned on the left and the score stays pinned on the right while the table scrolls horizontally.
    </p>
    <STable :columns="columns" :data="data" :row-key="row => row.id" bordered />
  </div>
</template>
