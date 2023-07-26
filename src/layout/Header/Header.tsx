import { Component, JSXElement, children } from 'solid-js';

const Header: Component<{ children: JSXElement }> = (props) => {
  const childContent = children(() => props.children);
  return <>{childContent()}</>;
};
export default Header;
