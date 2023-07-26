import {
  Component,
  JSX,
  Accessor,
  Setter,
  InitializedResource
} from 'solid-js';

export type WithChildrenProps<P = {}> = P & { children: JSX.Element };
export type WithChildrenComponent<P = {}> = Component<WithChildrenProps<P>>;

export type CommonProps<P = {}> = P & { children?: JSX.Element };
export type CommonComponent<P = {}> = Component<CommonProps<P>>;

export type UserCotextValue = Accessor<{
  user: InitializedResource<{
    id: number;
    userName: string;
  }>;
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
}>;

export type DashboardType = {
  name: string;
  key: string;
  type: string;
  span: number;
};

export type ColorString = string | number;

export type LocalConfigContextValue = Accessor<{
  header?: string | string[];
  siderResizerColor?: ColorString;
  setSiderResizerColor: (_value: ColorString) => void;
  mainSiderWidth: number;
  dashboards: DashboardType[];
  setMainSiderWidth: (_value: number) => void;
  setDashboards: (_value: DashboardType[]) => void;
}>;

export type RouteItem = {
  key: string;
  value?: JSX.Element;
  component: Component;
};
