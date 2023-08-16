import { createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  DASHBOARDS_KEY,
  DEFAULT_HEADER,
  DEFAULT_MOBILE_SIDER_WIDTH,
  DEFAULT_SIDER_RESIZER_COLOR,
  DEFAULT_SIDER_WIDTH,
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
  const fabX = localStorage.getItem('fabX');
  const fabY = localStorage.getItem('fabY');
  const localDashboards = localStorage.getItem(DASHBOARDS_KEY);
  const siderResizerColor = localStorage.getItem(SIDER_RESIZER_COLOR_KEY);
  const header = localStorage.getItem(HEADER_KEY);
  const isMobile = !!navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )?.length;

  const [store, setStore] = createStore<{
    mainSiderWidth: number;
    dashboards: DashboardType[];
    siderResizerColor: ColorString;
    header: string | string[];
    isMobile: boolean;
    fabX: number;
    fabY: number;
  }>({
    mainSiderWidth:
      parseInt(localMainSiderWidthd as string) ||
      (isMobile ? DEFAULT_MOBILE_SIDER_WIDTH : DEFAULT_SIDER_WIDTH),
    dashboards: JSON.parse(localDashboards ?? 'null') || [
      { name: 'CostRing', key: 'CostRing', type: 'list', span: 100 },
      { name: 'CostTypeBar', key: 'CostTypeBar', type: 'bar', span: 24 },
      { name: 'CostDailyList', key: 'CostDailyList', type: 'list', span: 24 },
    ],
    siderResizerColor: siderResizerColor ?? DEFAULT_SIDER_RESIZER_COLOR,
    header: JSON.parse(header ?? 'null') ?? DEFAULT_HEADER,
    isMobile,
    fabX: fabX ? Number(fabX) : -1,
    fabY: fabY ? Number(fabY) : -1,
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
      if (Reflect.has(newStore, 'fabX')) {
        const { fabX } = newStore;
        setStore({ fabX });
        localStorage.setItem('fabX', `${fabX}`);
      }
      if (Reflect.has(newStore, 'fabY')) {
        const { fabY } = newStore;
        setStore({ fabY });
        localStorage.setItem('fabY', `${fabY}`);
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
