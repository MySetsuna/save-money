import { Component, JSX, Accessor, Resource, Setter } from 'solid-js';

export type WithChildrenProps<P = {}> = P & { children: JSX.Element };
export type WithChildrenComponent<P = {}> = Component<WithChildrenProps<P>>;

export type CommonProps<P = {}> = P & { children?: JSX.Element };
export type CommonComponent<P = {}> = P & { children: JSX.Element };

export type UserCotextValue = Accessor<{
  user: Resource<{
    id: number;
    userName: string;
  }>;
  setUserId: Setter<number>;
  mutate: Setter<
    | {
        id: number;
        userName: string;
      }
    | undefined
  >;
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
}>;

export type DashboardType = {
  name: string;
  key: string;
  type: string;
  span: number;
};

export type ColorString = string | number;

export type LocalConfigContextValue = Accessor<{
  siderResizerColor?: ColorString;
  setSiderResizerColor: (_value: ColorString) => void;
  mainSiderWidth: number;
  dashboards: DashboardType[];
  setMainSiderWidth: (_value: number) => void;
  setDashboards: (_value: DashboardType[]) => void;
}>;
