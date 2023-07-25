import { Component, JSX } from 'solid-js';
import Dashboard from '../components/Dashboard';

const routes: { key: string; value?: JSX.Element; component: Component }[] = [
  { key: '/dashboard', value: '看板', component: Dashboard },
  { key: '/total', value: 'Total', component: () => '总计' },
  { key: '/description', value: 'Description', component: () => '描述' },
];
export default routes;
