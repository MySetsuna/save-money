import { Route, Routes } from '@solidjs/router';
import { For, type Component } from 'solid-js';

const RouteContent: Component<{
  routes: { key: string; component: Component }[];
}> = (props) => {
  return (
    <Routes>
      <For each={props.routes}>
        {(route) => {
          return <Route path={route.key} component={route.component} />;
        }}
      </For>
    </Routes>
  );
};

export default RouteContent;
