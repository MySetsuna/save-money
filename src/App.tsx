import { type Component, ErrorBoundary } from 'solid-js';
import styles from './App.module.scss';
import MainContent from './layout/MainContent/MainContent';
import config from './config';
import RouteContent from './components/RouteContent/RouteContent';
import Header from './layout/Header';
import Main from './layout/Main';
import SignIn from './pages/SignIn';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Header />
      <ErrorBoundary fallback={SignIn}>
        <Main routes={config.routes}>
          <MainContent>
            <RouteContent routes={config.routes} />
          </MainContent>
        </Main>
      </ErrorBoundary>
    </div>
  );
};

export default App;
