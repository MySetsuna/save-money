import { lazy } from 'solid-js';
import { RouteItem } from '../types';
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const SignIn = lazy(() => import('@/pages/SignIn'));
const DetailPage = lazy(() => import('@/pages/DetailPage'));
const routes: RouteItem[] = [
  { key: '/', value: '主页', component: () => '主页' },
  { key: '/dashboard', value: '看板', component: Dashboard },
  { key: '/total', value: '总计', component: () => '总计' },
  { key: '/detail', value: '详情', component: DetailPage },
  {
    key: '/description',
    value: '描述',
    component: () => '描述',
  },
  { key: '/login', value: '', component: SignIn, noSider: true },
  {
    key: '/additem',
    value: '',
    component: (props) => {
      console.log(props);

      return <></>;
    },
    noSider: true,
  },
];
export default routes;
