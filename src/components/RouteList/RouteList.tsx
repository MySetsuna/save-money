import { A } from '@solidjs/router';
import type { Component, JSX } from 'solid-js';
import { For } from 'solid-js';
import './RouteList.css';
const RouteList: Component<{
  routes: {
    key: string;
    value?: JSX.Element;
    linkComponent?: Component<{ class?: string; style?: JSX.CSSProperties }>;
  }[];
}> = (props) => {
  return (
    <div class="list">
      <For each={props.routes}>
        {(item) => {
          return (
            <A
              href={item.key}
              activeClass={
                item.linkComponent ? 'active-add-link' : 'active-link'
              }
              class={item.linkComponent ? 'add-link' : 'normal-link'}
              end={true}
            >
              {item.linkComponent
                ? (
                <item.linkComponent style={{ transform: ' scale(0.5)' }} />
                  )
                : (
                    item.value
                  )}
            </A>
          );
        }}
      </For>
    </div>
  );
};
export default RouteList;
