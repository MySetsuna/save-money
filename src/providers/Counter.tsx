import { CounterContextValue, WithChildrenComponent } from '@/types';
import { createContext, createResource, useContext } from 'solid-js';
import { useUser } from './User';

const fetchCounter = async (_userId?: number) => {
  return await new Promise<{ userId: number; total: number; balance: number }>(
    (resolve) => {
      setTimeout(() => {
        console.log(_userId, '_userId');
        resolve({ userId: 5, total: 1500, balance: 100 });
      });
    }
  );
};

const CounterContext = createContext<CounterContextValue>();
const CounterProvider: WithChildrenComponent = (props) => {
  const [userStore] = useUser();
  const [counter, { mutate, refetch }] = createResource(
    userStore().id,
    fetchCounter,
    {
      initialValue: { userId: -1, total: 0, balance: 0 },
    }
  );
  const contextValue = [counter, { mutate, refetch }];
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
