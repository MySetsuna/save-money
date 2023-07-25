import { Component, JSX } from 'solid-js';

const routes: { key: string; value?: JSX.Element; component: Component }[] = [
  { key: '/about', value: 'About', component: () => '关于' },
  { key: '/total', value: 'Total', component: () => '总计' },
  { key: '/description', value: 'Description', component: () => '描述' }
];
export default routes;
