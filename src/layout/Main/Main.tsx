import { useUser } from '../../providers/User';
import styles from './Main.module.scss';
import { CommonComponent, RouteItem } from '../../types';
import Sider from '../Sider/Sider';
import RouteList from '../../components/RouteList/RouteList';
import { useLocalConfig } from '@/providers/LocalConfig';
import MainContent from '../MainContent';
import { Outlet } from '@solidjs/router';
import FloatingActionButton from '@/components/FloatingActionButton';
const Main: CommonComponent<{ routes: RouteItem[] }> = (props) => {
  const [userStore] = useUser();
  const [configStore] = useLocalConfig();
  return (
    <>
      <main
        class={styles.main}
        classList={{ [styles.loading]: userStore.loading }}
      >
        <FloatingActionButton />
        <Sider minSiderWidth={configStore.isMobile ? 50 : undefined}>
          <span># 菜单</span>
          <RouteList routes={props.routes.filter((item) => !item.noSider)} />
        </Sider>
        <MainContent>
          <Outlet />
        </MainContent>
      </main>
    </>
  );
};
export default Main;
