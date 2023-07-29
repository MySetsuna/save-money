import { CounterContextValue, WithChildrenComponent } from '@/types';
import {
  createContext,
  createEffect,
  createSignal,
  useContext
} from 'solid-js';
import { useUser } from './User';

const fetchCounter = async (_userId?: number) => {
  return await new Promise<{ userId: number; total: number; balance: number }>(
    (resolve) => {
      setTimeout(() => {
        console.log(_userId, '_userId');
        const counterJSON = localStorage.getItem(`${_userId}_COUNTER`);
        if (counterJSON) {
          resolve(JSON.parse(counterJSON));
        }
        resolve({ userId: _userId ?? -1, total: 1500, balance: 100 });
      });
    }
  );
};

const CounterContext = createContext<CounterContextValue>();
const CounterProvider: WithChildrenComponent = (props) => {
  const [userStore] = useUser();

  const [counter, setCounter] = createSignal({ userId: -1, total: 999, balance: 0 });
  createEffect(() => {
    if (userStore().id > 0) {
      fetchCounter(userStore().id).then((data) => {
        setCounter(data);
      });
    }
  });
  const contextValue = [
    counter,
    {
      setCounter: (counter: {
        userId: number;
        total: number;
        balance: number;
      }) => {
        setCounter(counter);
        localStorage.setItem(
          `${userStore().id}_COUNTER`,
          JSON.stringify(counter)
        );
      },
    },
  ];
  return (
    <CounterContext.Provider value={contextValue as CounterContextValue}>
      {props.children}
    </CounterContext.Provider>
  );
};
const useCounter = () => {
  const context = useContext<CounterContextValue | undefined>(CounterContext);
  if (context) {
    return context;
  }
  throw new Error('use useCounter inside CounterProvider');
};

export default CounterProvider;
export { useCounter };
