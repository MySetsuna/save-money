import { Component } from 'solid-js';
import { CostDailyList, CostTypeBar } from '../pages/Dashboard';

const dashboardMap: { [propName: string]: Component } = {
  CostTypeBar,
  CostDailyList,
};
export default dashboardMap;
