import { Component, JSX, Setter, InitializedResource } from 'solid-js';

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

export type DashboardType = {
  name: string;
  key: string;
  type: string;
  span: number;
};

export type ColorString = string | number;

export type LocalConfigContextValue = [
  {
    mainSiderWidth: number;
    dashboards: DashboardType[];
    siderResizerColor: ColorString;
    header: string | string[];
  },
  (_newStore: {
    mainSiderWidth?: number;
    dashboards?: DashboardType[];
    siderResizerColor?: ColorString;
    header?: string | string[];
  }) => void
];

export type RouteItem = {
  key: string;
  value?: JSX.Element;
  component: Component;
};

export type ErrorPageProps = {
  fallback: JSX.Element | ((_err: any, _reset: () => void) => JSX.Element);
  children: JSX.Element;
};
export type ErrorPageComponent = Component<ErrorPageProps>;
