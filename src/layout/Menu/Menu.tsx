import { createStore } from 'solid-js/store';
import { children, mergeProps, onMount } from 'solid-js';
import styles from './Menu.module.scss';
import { WithChildrenComponent } from '../../types';

const Menu: WithChildrenComponent<{
  className?: string;
  hidden?: boolean;
}> = (props) => {
  let menu: HTMLDivElement | undefined;
  const childContent = children(() => props.children);

  const merged = mergeProps({ hidden: false }, props);
  const [store, setStore] = createStore({
    hidden: false,
    width: 0,
  });

  onMount(() => {
    setStore({
      hidden: merged.hidden,
    });
  });

  return (
    <div class={styles.menu} ref={menu}>
      <div
        class={[styles.menuBox, props.className].join(' ')}
        classList={{ [styles.hidden]: store.hidden }}
      >
        {childContent()}
      </div>
    </div>
  );
};
export default Menu;
