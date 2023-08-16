import { CostTypeBar, CostDailyList, CostRing } from '@/pages/Dashboard';
import { Component } from 'solid-js';
const dashboardMap: { [propName: string]: Component } = {
  CostTypeBar,
  CostDailyList,
  CostRing,
};
export default dashboardMap;
