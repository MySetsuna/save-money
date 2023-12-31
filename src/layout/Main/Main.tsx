import { useUser } from '../../providers/User';
import styles from './Main.module.scss';
import { CommonComponent, RouteItem } from '../../types';
import RouteList from '../../components/RouteList/RouteList';
import MainContent from '../MainContent';
import { Outlet } from '@solidjs/router';
import Menu from '@/layout/Menu';
import { BalanceHeader } from '../Header';
const Main: CommonComponent<{ routes: RouteItem[] }> = (props) => {
  const [userStore] = useUser();

  return (
    <>
      <main
        class={styles.main}
        classList={{ [styles.loading]: userStore.loading }}
      >
        <MainContent>
          <Outlet />
        </MainContent>
        <Menu>
          <BalanceHeader />
          <RouteList routes={props.routes.filter((item) => !item.noInMenu)} />
        </Menu>
      </main>
    </>
  );
};
export default Main;
