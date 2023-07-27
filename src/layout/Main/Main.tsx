import { children } from 'solid-js';
import { useUser } from '../../providers/User';
import styles from './Main.module.scss';
import { RouteItem, WithChildrenComponent } from '../../types';
import Sider from '../Sider/Sider';
import RouteList from '../../components/RouteList/RouteList';
const Main: WithChildrenComponent<{ routes: RouteItem[] }> = (props) => {
  const [userStore] = useUser();
  const childrenContent = children(() => props.children);
  return (
    <>
      <main
        class={styles.main}
        classList={{ [styles.loading]: userStore.loading }}
      >
        <Sider>
          <span># 菜单</span>
          <RouteList routes={props.routes} />
        </Sider>
        {childrenContent()}
      </main>
    </>
  );
};
export default Main;
