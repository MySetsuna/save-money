// import { useLocalConfig } from '@/providers/LocalConfig';
import { createEffect, createMemo } from 'solid-js';
import styles from './BalanceHeader.module.scss';
import { useCounter } from '@/providers/Counter';
import dayjs from 'dayjs';
import {
  BALANCE_LAVEL_HIGHT,
  BALANCE_LAVEL_LOW,
  BALANCE_LAVEL_MIDDLE,
  CSS_BAR_COLOR,
  CSS_BORDER_COLOR
} from '@/constant';
//  绿,黄,蓝三种颜色,感叹号表示日余额低于警告水平
// green yellow crimson
const BalanceHeader = () => {
  // const [configStore] = useLocalConfig();
  const [counterStore, { mutate }] = useCounter();
  let bBox: HTMLDivElement | undefined;

  Reflect.set(window, 'setCounter', mutate);

  const summary = createMemo(() => {
    const { total, balance } = counterStore();

    const today = dayjs();
    const curMonthLastDay = today.add(1, 'month').startOf('month');
    const days = curMonthLastDay.diff(today, 'days') + 1;

    const cost = total - balance;
    const balancePercentNumebr = Math.round((balance * 100) / total);
    return {
      costPercent: `${Math.round((cost * 100) / total)}%`,
      balancePercent: `${balancePercentNumebr}%`,
      total,
      cost,
      balance,
      dayBalance: Math.round((balance * 100) / days) / 100,
      balancePercentNumebr,
    };
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
    bBox?.style.setProperty(CSS_BORDER_COLOR, `var(--${level}-border-color)`);
    bBox?.style.setProperty(CSS_BAR_COLOR, `var(--${level}-bar-color)`);
  });

  return (
    <>
      <div
        ref={bBox}
        class={styles.balanceBox}
        style={{
          display: 'flex',
          'flex-wrap': 'nowrap',
          width: 'auto',
          height: '100%',
          flex: 'auto',
        }}
      >
        <div class={styles.cost} style={{ width: summary().costPercent }}>
          <div>{summary().cost}</div>
          <div>{summary().costPercent}</div>
        </div>
        <div class={styles.box} style={{ width: summary().balancePercent }}>
          <div class={styles.balance}>
            <div>{summary().balance}</div>
            <div>{summary().balancePercent}</div>
          </div>
        </div>
        <div class={styles.total}>
          <div>总 {summary().cost}</div>
          <div>日余 {summary().dayBalance}</div>
        </div>
      </div>
    </>
  );
};
export default BalanceHeader;
