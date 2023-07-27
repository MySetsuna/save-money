import { Component, For, Suspense } from 'solid-js';
import styles from './Header.module.scss';
import { useUser } from '../../providers/User';
import { Dynamic } from 'solid-js/web';
import { useLocalConfig } from '../../providers/LocalConfig';
import config from '../../config';

const Header: Component = () => {
  const [userStore] = useUser();
  const [configStore] = useLocalConfig();
  const { headerMap } = config;
  return (
    <nav class={styles.nav}>
      <div class={styles.navContent}>
        {configStore.header instanceof Array
          ? (
          <For each={configStore.header as string[]}>
            {(header) => {
              return <Dynamic component={headerMap[header]} />;
            }}
          </For>
            )
          : (
          <Dynamic component={headerMap[configStore.header as string]} />
            )}
        <div style={{ 'padding-left': '10px', width: '15%' }}>
          <Suspense fallback={'loading...'}>{userStore().userName}</Suspense>
        </div>
      </div>
    </nav>
  );
};
export default Header;
