import {
  createContext,
  useContext,
  JSXElement,
  Component,
  mergeProps,
  onMount,
} from 'solid-js';
import { createStore } from 'solid-js/store';

type DashboardType = {
  name: string;
  key: string;
  type: string;
  span: number;
};

const LocalConfigContext = createContext<{
  store: { mainSiderWidth: number; dashboards: DashboardType[] };
  setMainSiderWidth: (_value: number) => void;
  setDashboards: (_value: DashboardType[]) => void;
}>();

export const LocalConfigProvider: Component<{
  children: JSXElement;
}> = (props) => {
  const localMainSiderWidthd = localStorage.getItem('mainSiderWidth');
  const localDashboards = localStorage.getItem('dashboards');
  const merged = mergeProps(
    {
      mainSiderWidth: parseInt(localMainSiderWidthd as string),
      dashboards: JSON.parse(localDashboards ?? 'null') || [
        { name: 'CostTypeBar', key: 'CostTypeBar', type: 'bar', span: 24 },
        { name: 'CostDailyList', key: 'CostDailyList', type: 'list', span: 24 },
      ],
    },
    props
  );

  const [store, setStore] = createStore<{
    mainSiderWidth: number;
    dashboards: DashboardType[];
  }>({
    mainSiderWidth: 500,
    dashboards: [],
  });

  onMount(() => {
    console.log(merged.dashboards, 'merged.dashboards');

    setStore({
      mainSiderWidth: merged.mainSiderWidth ? merged.mainSiderWidth : 500,
      dashboards: merged.dashboards,
    });
  });

  return (
    <LocalConfigContext.Provider
      value={{
        store,
        setMainSiderWidth: (value: number) => {
          setStore({ mainSiderWidth: value });
          localStorage.setItem('mainSiderWidth', `${value}`);
        },
        setDashboards: (value: DashboardType[]) => {
          setStore({ dashboards: value });
          localStorage.setItem('dashboards', JSON.stringify(value));
        },
      }}
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
