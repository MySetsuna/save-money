import { children } from 'solid-js';
import { useUser } from '../../providers/User';
import styles from './Main.module.scss';
import { RouteItem, WithChildrenComponent } from '../../types';
import Sider from '../Sider/Sider';
import RouteList from '../../components/RouteList/RouteList';
import { useLocalConfig } from '@/providers/LocalConfig';
const Main: WithChildrenComponent<{ routes: RouteItem[] }> = (props) => {
  const [userStore] = useUser();
  const [configStore] = useLocalConfig();
  const childrenContent = children(() => props.children);
  return (
    <>
      <main
        class={styles.main}
        classList={{ [styles.loading]: userStore.loading }}
      >
        <div style={{ width: '50px' }} />
        <Sider minSiderWidth={configStore.isMobile ? 50 : undefined}>
          <span># 菜单</span>
          <RouteList routes={props.routes} />
        </Sider>
        {childrenContent()}
      </main>
    </>
  );
};
export default Main;
