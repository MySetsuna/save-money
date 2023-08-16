import { lazy } from 'solid-js';
import { RouteItem } from '../types';
import AddButton from '@/components/AddButton';
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const SignIn = lazy(() => import('@/pages/SignIn'));
const Addition = lazy(() => import('@/pages/Addition'));
const DetailPage = lazy(() => import('@/pages/DetailPage'));
const routes: RouteItem[] = [
  { key: '/', value: '主页', component: Dashboard },
  { key: '/total', value: '总计', component: () => '总计' },
  {
    key: '/additem',
    value: '添加',
    component: Addition,
    linkComponent: AddButton,
  },
  { key: '/detail', value: '详情', component: DetailPage },
  {
    key: '/setting',
    value: '设置',
    component: () => '设置',
  },
  {
    key: '/login',
    value: '',
    component: SignIn,
    noInMenu: true,
  },
];
export default routes;
