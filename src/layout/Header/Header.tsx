import { Component, JSXElement, children } from 'solid-js';
import styles from './Header.module.scss';

const Header: Component<{ children: JSXElement }> = (props) => {
  const childContent = children(() => props.children);
  return (
    <nav class={styles.nav}>
      <div class={styles.navContent}>{childContent()}</div>
    </nav>
  );
};
export default Header;
