import type { Component, JSX } from 'solid-js';
const MainContent: Component<{ children: JSX.Element }> = (props) => {
  return <>{props.children}</>;
};
export default MainContent;
