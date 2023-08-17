import { type Component, ErrorBoundary, createSignal, onMount } from 'solid-js';
import styles from './App.module.scss';
import config from './config';
import RouteContent from './components/RouteContent/RouteContent';
// import Header from './layout/Header';
import Main from './layout/Main';
import ErrorPage from './pages/ErrorPage';
import { Outlet, Route, Routes } from '@solidjs/router';

const App: Component = () => {
  const [appHeight, setAppHeight] = createSignal('100%');
  onMount(() => {
    console.log(window.innerHeight, 'document.body.offsetHeight');
    setAppHeight(`${window.innerHeight}px`);
    window.onresize = () => {
      setAppHeight(`${window.innerHeight}px`);
    };
  });
  return (
    <div class={styles.App} style={{ height: appHeight() }}>
      {/* <Header /> */}
      <ErrorBoundary fallback={ErrorPage}>
        <Routes>
          <Route path="/" element={<Main routes={config.routes} />}>
            <RouteContent routes={config.routes} />
          </Route>
        </Routes>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
};

export default App;
