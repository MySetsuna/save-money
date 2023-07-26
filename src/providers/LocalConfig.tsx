import { createContext, useContext, createMemo } from 'solid-js';
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

  const contextValue = createMemo(() => {
    return {
      ...store,
      setMainSiderWidth: (value: number) => {
        setStore({ mainSiderWidth: value });
        localStorage.setItem(MAIN_SIDER_WIDTH_KEY, `${value}`);
      },
      setDashboards: (value: DashboardType[]) => {
        setStore({ dashboards: value });
        localStorage.setItem(DASHBOARDS_KEY, JSON.stringify(value));
      },
      setSiderResizerColor: (value: ColorString) => {
        setStore({ siderResizerColor: value });
        localStorage.setItem(SIDER_RESIZER_COLOR_KEY, `${value}`);
      },
      setHeader: (value: string | string[]) => {
        setStore({ header: value });
        localStorage.setItem(
          HEADER_KEY,
          typeof value === 'string' ? value : JSON.stringify(value)
        );
      },
    };
  });

  return (
    <LocalConfigContext.Provider value={contextValue}>
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
