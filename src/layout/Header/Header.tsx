import { Component, For, Suspense } from 'solid-js';
import styles from './Header.module.scss';
import { useUser } from '../../providers/User';
import { Dynamic } from 'solid-js/web';
import { useLocalConfig } from '../../providers/LocalConfig';
import config from '../../config';

const Header: Component = () => {
  const userStore = useUser();
  const localConfigStore = useLocalConfig();
  const { headerMap } = config;
  return (
    <nav class={styles.nav}>
      <div class={styles.navContent}>
        {localConfigStore().header instanceof Array
          ? (
          <For each={localConfigStore().header as string[]}>
            {(header) => {
              return <Dynamic component={headerMap[header]} />;
            }}
          </For>
            )
          : (
          <Dynamic component={headerMap[localConfigStore().header as string]} />
            )}
        <div style={{ 'padding-left': '10px', width: '50px' }}>
          <Suspense fallback={'loading...'}>
            {userStore().user().userName}
          </Suspense>
        </div>
      </div>
    </nav>
  );
};
export default Header;
