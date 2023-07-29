import { ErrorBoundary } from 'solid-js';
/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';
import './index.css';
import App from './App';
import { hashIntegration, Router } from '@solidjs/router';
import { UserProvider } from './providers/User';
import { LocalConfigProvider } from './providers/LocalConfig';
import SignIn from './pages/SignIn';
import CommonHeader from './layout/Header/components/CommonHeader';
import CounterProvider from './providers/Counter';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

render(
  () => (
    <Router
      source={import.meta.env.MODE === 'gh' ? hashIntegration() : undefined}
    >
      <ErrorBoundary
        fallback={() => (
          <>
            <CommonHeader>登录</CommonHeader>
            <SignIn />
          </>
        )}
      >
        <UserProvider>
          <LocalConfigProvider>
            <CounterProvider>
              <App />
            </CounterProvider>
          </LocalConfigProvider>
        </UserProvider>
      </ErrorBoundary>
    </Router>
  ),
  root!
);
