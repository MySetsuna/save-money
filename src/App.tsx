import type { Component } from 'solid-js';
import styles from './App.module.css';
import Sider from './layout/Sider/Sider';
import MainContent from './layout/MainContent/MainContent';
import RouteList from './components/RouteList/RouteList';
import config from './config';
import RouteContent from './components/RouteContent/RouteContent';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <nav class={styles.nav}>
        <div class={styles.navContent}>virtual-table</div>
      </nav>
      <main class={styles.main}>
        <div class={styles.sider}>
          <Sider>
            <span># 菜单</span>
            <RouteList routes={config.routes} />
          </Sider>
        </div>
        <div class={styles.content}>
          <MainContent>
            <RouteContent routes={config.routes} />
          </MainContent>
        </div>
      </main>
    </div>
  );
};

export default App;
