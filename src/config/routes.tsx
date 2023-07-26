import Dashboard from '../components/Dashboard';
import { RouteItem } from '../types';

const routes: RouteItem[] = [
  { key: '/dashboard', value: '看板', component: Dashboard },
  { key: '/total', value: 'Total', component: () => '总计' },
  { key: '/description', value: 'Description', component: () => '描述' },
];
export default routes;
