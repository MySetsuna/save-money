import {
  Component,
  JSX,
  Setter,
  InitializedResource,
  Accessor
} from 'solid-js';

export type WithChildrenProps<P = {}> = P & { children: JSX.Element };
export type WithChildrenComponent<P = {}> = Component<WithChildrenProps<P>>;

export type CommonProps<P = {}> = P & { children?: JSX.Element };
export type CommonComponent<P = {}> = Component<CommonProps<P>>;

export type UserCotextValue = [
  InitializedResource<{
    id: number;
    userName: string;
  }>,
  {
    setUserId: Setter<number>;
    mutate: Setter<{
      id: number;
      userName: string;
    }>;
    refetch: (_info?: unknown) =>
      | {
          id: number;
          userName: string;
        }
      | Promise<
          | {
              id: number;
              userName: string;
            }
          | undefined
        >
      | null
      | undefined;
  }
];

export type CounterContextValue = [
  Accessor<{
    userId: number;
    total: number;
    balance: number;
  }>,
  {
    setCounter: (_counter: {
      userId: number;
      total: number;
      balance: number;
    }) => void;
    refetch: (_info?: unknown) =>
      | {
          userId: number;
          total: number;
          balance: number;
        }
      | Promise<
          | {
              userId: number;
              total: number;
              balance: number;
            }
          | undefined
        >
      | null
      | undefined;
  }
];

export type DashboardType = {
  name: string;
  key: string;
  type: string;
  span: number;
};

export type ColorString = string | number;

export type configStore = {
  mainSiderWidth?: number;
  dashboards?: DashboardType[];
  siderResizerColor?: ColorString;
  header?: string | string[];
  isMobile?: boolean;
  fabX?: number;
  fabY?: number;
};

export type LocalConfigContextValue = [
  configStore,
  (_newStore: configStore) => void
];

export type RouteItem = {
  key: string;
  value?: JSX.Element;
  component: Component;
  noInMenu?: boolean;
  linkComponent?: Component;
};

export type ErrorPageProps = {
  fallback: JSX.Element | ((_err: any, _reset: () => void) => JSX.Element);
  children: JSX.Element;
};
export type ErrorPageComponent = Component<ErrorPageProps>;
