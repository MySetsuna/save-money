import { createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  DASHBOARDS_KEY,
  DEFAULT_HEADER,
  DEFAULT_SIDER_RESIZER_COLOR,
  DEFAULT_SIDER_SIDER_WIDTH,
  HEADER_KEY,
  MAIN_SIDER_WIDTH_KEY,
  SIDER_RESIZER_COLOR_KEY
} from '../constant';
import {
  ColorString,
  DashboardType,
  LocalConfigContextValue,
  WithChildrenComponent
} from '../types';

const LocalConfigContext = createContext<LocalConfigContextValue>();

export const LocalConfigProvider: WithChildrenComponent = (props) => {
  const localMainSiderWidthd = localStorage.getItem(MAIN_SIDER_WIDTH_KEY);
  const localDashboards = localStorage.getItem(DASHBOARDS_KEY);
  const siderResizerColor = localStorage.getItem(SIDER_RESIZER_COLOR_KEY);
  const header = localStorage.getItem(HEADER_KEY);

  const [store, setStore] = createStore<{
    mainSiderWidth: number;
    dashboards: DashboardType[];
    siderResizerColor: ColorString;
    header: string | string[];
  }>({
    mainSiderWidth:
      parseInt(localMainSiderWidthd as string) ?? DEFAULT_SIDER_SIDER_WIDTH,
    dashboards: JSON.parse(localDashboards ?? 'null') || [
      { name: 'CostTypeBar', key: 'CostTypeBar', type: 'bar', span: 24 },
      { name: 'CostDailyList', key: 'CostDailyList', type: 'list', span: 24 },
    ],
    siderResizerColor: siderResizerColor ?? DEFAULT_SIDER_RESIZER_COLOR,
    header: JSON.parse(header ?? 'null') ?? DEFAULT_HEADER,
  });

  const contextValue = [
    store,
    (newStore: typeof store) => {
      if (Reflect.has(newStore, 'mainSiderWidth')) {
        const { mainSiderWidth } = newStore;
        setStore({ mainSiderWidth });
        localStorage.setItem(MAIN_SIDER_WIDTH_KEY, `${mainSiderWidth}`);
      }
      if (Reflect.has(newStore, 'dashboards')) {
        const { dashboards } = newStore;
        setStore({ dashboards });
        localStorage.setItem(DASHBOARDS_KEY, JSON.stringify(dashboards));
      }
      if (Reflect.has(newStore, 'siderResizerColor')) {
        const { siderResizerColor } = newStore;
        setStore({ siderResizerColor });
        localStorage.setItem(SIDER_RESIZER_COLOR_KEY, `${siderResizerColor}`);
      }
      if (Reflect.has(newStore, 'header')) {
        const { header } = newStore;
        setStore({ header });
        localStorage.setItem(
          HEADER_KEY,
          typeof header === 'string' ? header : JSON.stringify(header)
        );
      }
    },
  ];

  return (
    <LocalConfigContext.Provider
      value={contextValue as LocalConfigContextValue}
    >
      {props.children}
    </LocalConfigContext.Provider>
  );
};

export function useLocalConfig() {
  const context = useContext(LocalConfigContext);
  if (context) {
    return context;
  }
  throw new Error('use LocalConfig inside LocalConfigProvider');
}
