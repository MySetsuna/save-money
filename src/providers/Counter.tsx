import { CounterContextValue, WithChildrenComponent } from '@/types';
import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  useContext
} from 'solid-js';
import { useUser } from './User';
import dayjs from 'dayjs';
import {
  BALANCE_LAVEL_HIGHT,
  BALANCE_LAVEL_LOW,
  BALANCE_LAVEL_MIDDLE,
  CSS_BAR_COLOR,
  CSS_BORDER_COLOR
} from '@/constant';

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

  const [counter, setCounter] = createSignal({
    userId: -1,
    total: 999,
    balance: 0,
  });
  createEffect(() => {
    if (userStore().id > 0) {
      fetchCounter(userStore().id).then((data) => {
        setCounter(data);
      });
    }
  });

  createEffect(() => {
    console.log(777);

    const { balancePercentNumebr: percent } = summary();
    let level = BALANCE_LAVEL_HIGHT;
    if (percent < 60 && percent > 20) {
      level = BALANCE_LAVEL_MIDDLE;
    }
    if (percent <= 20) {
      // bBox?.style.setProperty('--bar-color', 'red');
      level = BALANCE_LAVEL_LOW;
    }
    document.body?.style.setProperty(
      CSS_BORDER_COLOR,
      `var(--${level}-border-color)`
    );
    document.body?.style.setProperty(
      CSS_BAR_COLOR,
      `var(--${level}-bar-color)`
    );
  });

  const summary = createMemo(() => {
    const { total, balance } = counter();

    const today = dayjs();
    const curMonthLastDay = today.add(1, 'month').startOf('month');
    const days = curMonthLastDay.diff(today, 'days') + 1;

    const cost = total - balance;
    const costDays = today.get('D');
    console.log(costDays, 'costDays');

    const balancePercentNumebr = Math.round((balance * 100) / total);
    return {
      costPercent: `${Math.round((cost * 100) / total)}%`,
      balancePercent: `${Math.max(balancePercentNumebr, 0)}%`,
      total,
      cost,
      balance,
      dayBalance: Math.round((balance * 100) / days) / 100,
      dayCost: Math.round((cost * 100) / costDays) / 100,
      balancePercentNumebr,
    };
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
    summary,
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
