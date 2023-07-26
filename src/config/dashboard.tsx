import { Component } from 'solid-js';
import CostDailyList from '../components/Dashboard/components/ConstDailyList';
import CostTypeBar from '../components/Dashboard/components/CostTypeBar';

const dashboardMap: { [propName: string]: Component } = {
  CostTypeBar,
  CostDailyList,
};
export default dashboardMap;
