import { Route } from '@solidjs/router';
import { For, type Component } from 'solid-js';

const RouteContent: Component<{
  routes: { key: string; component: Component; noInContent?: boolean }[];
}> = (props) => {
  return (
    <For each={props.routes}>
      {(route) => {
        return <Route path={route.key} component={route.component} />;
      }}
    </For>
  );
};

export default RouteContent;
