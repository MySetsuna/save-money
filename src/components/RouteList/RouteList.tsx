import { A } from '@solidjs/router';
import type { Component, JSX } from 'solid-js';
import { For } from 'solid-js';
import './RouteList.css';
const RouteList: Component<{
  routes: { key: string; value?: JSX.Element }[];
}> = (props) => {
  return (
    <div class="list">
      <For each={props.routes}>
        {(item) => {
          return (
            <A href={item.key} activeClass="active-link" end={true}>
              {item.value}
            </A>
          );
        }}
      </For>
    </div>
  );
};
export default RouteList;
