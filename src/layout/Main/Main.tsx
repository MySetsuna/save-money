import { useUser } from '../../providers/User';
import styles from './Main.module.scss';
import { CommonComponent, RouteItem } from '../../types';
import RouteList from '../../components/RouteList/RouteList';
import MainContent from '../MainContent';
import { Outlet, useLocation } from '@solidjs/router';
import Menu from '@/layout/Menu';
import { BalanceHeader } from '../Header';
import { createEffect, createSignal } from 'solid-js';
const Main: CommonComponent<{ routes: RouteItem[] }> = (props) => {
  const [userStore] = useUser();
  const [pathname, setPathname] = createSignal('');

  createEffect(() => {
    const { pathname } = useLocation();
    setPathname(pathname);
  });
  return (
    <>
      <main
        class={styles.main}
        classList={{ [styles.loading]: userStore.loading }}
      >
        <Menu>
          {pathname() !== '/add' && (
            <RouteList routes={props.routes.filter((item) => !item.noInMenu)} />
          )}
          <BalanceHeader style={{ height: '32px' }} />
        </Menu>
        <MainContent>
          <Outlet />
        </MainContent>
      </main>
    </>
  );
};
export default Main;
