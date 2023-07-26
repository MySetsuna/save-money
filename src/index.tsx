import { ErrorBoundary } from 'solid-js';
/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Router } from '@solidjs/router';
import { UserProvider } from './providers/User';
import { LocalConfigProvider } from './providers/LocalConfig';
import SignIn from './pages/SignIn';
import Header from './layout/Header';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

render(
  () => (
    <Router>
      <ErrorBoundary
        fallback={() => (
          <>
            <Header>登录</Header>
            <SignIn />
          </>
        )}
      >
        <UserProvider>
          <LocalConfigProvider>
            <App />
          </LocalConfigProvider>
        </UserProvider>
      </ErrorBoundary>
    </Router>
  ),
  root!
);
